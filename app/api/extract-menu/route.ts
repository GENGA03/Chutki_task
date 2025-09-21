import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { MenuItem } from '@/types/menu'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyBFc8GemJXrv-gf0nWPHgygiojQHxYAC-Y')

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!file.name.endsWith('.txt')) {
      return NextResponse.json({ error: 'File must be a .txt file' }, { status: 400 })
    }

    const text = await file.text()
    
    if (!text.trim()) {
      return NextResponse.json({ error: 'File is empty' }, { status: 400 })
    }

    const prompt = `You are an expert at extracting food menu information from text files. Please analyze the following text and extract all food menu items with their details.

Extract the following information for each menu item:
- name: The name of the food item
- description: A brief description of the item
- price: The price (if mentioned)
- category: The category (appetizer, main course, dessert, beverage, etc.)
- ingredients: List of main ingredients
- dietaryInfo: Dietary information (vegetarian, vegan, gluten-free, etc.)
- availability: When the item is available (breakfast, lunch, dinner, etc.)

Return the data as a JSON array with this exact structure:
[
  {
    "name": "Item Name",
    "description": "Item description",
    "price": "Price if available",
    "category": "Category name",
    "ingredients": ["ingredient1", "ingredient2"],
    "dietaryInfo": ["vegetarian", "gluten-free"],
    "availability": "breakfast, lunch, dinner"
  }
]

Text to analyze:
${text}

Please be thorough and extract all food-related items. If information is not available, use null for that field. Return only the JSON array, no other text.`

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent(prompt)
    const response = await result.response
    const responseText = response.text()
    
    if (!responseText) {
      throw new Error('No response from Gemini')
    }

    let extractedData: any[]
    try {
      const jsonMatch = responseText.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error('No valid JSON found in response')
      }
      extractedData = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError)
      console.error('Response text:', responseText)
      throw new Error('Failed to parse AI response')
    }

    const menuItems: MenuItem[] = extractedData.map((item, index) => ({
      id: `item-${Date.now()}-${index}`,
      name: item.name || 'Unknown Item',
      description: item.description || undefined,
      price: item.price || undefined,
      category: item.category || undefined,
      ingredients: Array.isArray(item.ingredients) ? item.ingredients : undefined,
      dietaryInfo: Array.isArray(item.dietaryInfo) ? item.dietaryInfo : undefined,
      availability: item.availability || undefined,
      createdAt: new Date().toISOString(),
    }))

    try {
      await sql`
        CREATE TABLE IF NOT EXISTS menu_items (
          id VARCHAR(255) PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price VARCHAR(100),
          category VARCHAR(100),
          ingredients TEXT[],
          dietary_info TEXT[],
          availability VARCHAR(100),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        )
      `

      for (const item of menuItems) {
        await sql`
          INSERT INTO menu_items (
            id, name, description, price, category, 
            ingredients, dietary_info, availability, created_at
          ) VALUES (
            ${item.id}, ${item.name}, ${item.description}, ${item.price}, 
            ${item.category}, ${item.ingredients}, ${item.dietaryInfo}, 
            ${item.availability}, ${item.createdAt}
          )
        `
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
    }

    return NextResponse.json({ 
      items: menuItems,
      totalItems: menuItems.length,
      message: 'Menu items extracted successfully'
    })

  } catch (error) {
    console.error('Error processing file:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process file' },
      { status: 500 }
    )
  }
}
