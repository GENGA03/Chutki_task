export interface MenuItem {
  id: string
  name: string
  description?: string
  price?: string
  category?: string
  ingredients?: string[]
  dietaryInfo?: string[]
  availability?: string
  createdAt: string
}

export interface ExtractedMenuData {
  items: MenuItem[]
  totalItems: number
  categories: string[]
  extractedAt: string
}
