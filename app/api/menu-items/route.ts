import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { MenuItem } from '@/types/menu'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')

    let query = 'SELECT * FROM menu_items'
    const params: any[] = []
    const conditions: string[] = []

    if (category && category !== 'all') {
      conditions.push(`category = $${params.length + 1}`)
      params.push(category)
    }

    if (search) {
      conditions.push(`(
        LOWER(name) LIKE LOWER($${params.length + 1}) OR 
        LOWER(description) LIKE LOWER($${params.length + 1}) OR
        EXISTS (
          SELECT 1 FROM unnest(ingredients) AS ingredient 
          WHERE LOWER(ingredient) LIKE LOWER($${params.length + 1})
        )
      )`)
      params.push(`%${search}%`)
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' ORDER BY created_at DESC'

    const result = await sql.query(query, params)

    const menuItems: MenuItem[] = result.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      price: row.price,
      category: row.category,
      ingredients: row.ingredients,
      dietaryInfo: row.dietary_info,
      availability: row.availability,
      createdAt: row.created_at,
    }))

    return NextResponse.json({ items: menuItems })

  } catch (error) {
    console.error('Error fetching menu items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu items' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Item ID required' }, { status: 400 })
    }

    await sql`DELETE FROM menu_items WHERE id = ${id}`

    return NextResponse.json({ message: 'Item deleted successfully' })

  } catch (error) {
    console.error('Error deleting menu item:', error)
    return NextResponse.json(
      { error: 'Failed to delete menu item' },
      { status: 500 }
    )
  }
}
