# 🍽️ Food Menu Extractor

A full-stack web application that extracts structured food menu data from text files using AI. Perfect for processing WhatsApp chat exports or any text file containing menu information.

## ✨ Features

- **File Upload**: Drag & drop or click to upload `.txt` files
- **AI-Powered Extraction**: Uses Google Gemini to intelligently extract menu items
- **Structured Data**: Extracts name, description, price, category, ingredients, dietary info, and availability
- **Search & Filter**: Find items by name, description, ingredients, or category
- **Database Storage**: Persistent storage using Vercel Postgres
- **Responsive Design**: Beautiful, modern UI that works on all devices

## 🚀 Live Demo

[Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/food-menu-extractor)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Vercel Postgres
- **AI Service**: Google Gemini 1.5 Flash
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- Google Gemini API key
- Vercel account (for database)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/food-menu-extractor.git
cd food-menu-extractor
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
cp config/env.example .env.local
```

Fill in your environment variables:

```env
# Google Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Vercel Postgres Configuration (get these from Vercel dashboard)
POSTGRES_URL=your_vercel_postgres_url_here
POSTGRES_PRISMA_URL=your_vercel_postgres_prisma_url_here
POSTGRES_URL_NO_SSL=your_vercel_postgres_url_no_ssl_here
POSTGRES_URL_NON_POOLING=your_vercel_postgres_url_non_pooling_here
POSTGRES_USER=your_postgres_user_here
POSTGRES_HOST=your_postgres_host_here
POSTGRES_PASSWORD=your_postgres_password_here
POSTGRES_DATABASE=your_postgres_database_here
```

### 4. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Go to API Keys section
4. Create a new API key
5. Copy the key to your `.env.local` file

### 5. Set up Vercel Postgres

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project or use existing one
3. Go to Storage tab
4. Create a new Postgres database
5. Copy the connection details to your `.env.local` file

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/food-menu-extractor)

## 🏗️ Architecture

### Frontend Components

- **`app/page.tsx`**: Main page with file upload and results display
- **`components/FileUpload.tsx`**: Drag & drop file upload component
- **`components/MenuDisplay.tsx`**: Display extracted menu items with search/filter
- **`types/menu.ts`**: TypeScript interfaces for menu data

### Backend API Routes

- **`app/api/extract-menu/route.ts`**: Processes uploaded files with OpenAI
- **`app/api/menu-items/route.ts`**: CRUD operations for stored menu items

### Database Schema

```sql
CREATE TABLE menu_items (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price VARCHAR(100),
  category VARCHAR(100),
  ingredients TEXT[],
  dietary_info TEXT[],
  availability VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🤖 AI Integration

The application uses Google's Gemini 1.5 Flash model to extract structured data from text files. The AI is prompted to:

1. Identify all food-related items in the text
2. Extract name, description, price, category, ingredients, dietary info, and availability
3. Return structured JSON data
4. Handle various text formats (WhatsApp chats, plain text, etc.)

### Prompt Design

The AI prompt is carefully designed to:
- Extract comprehensive menu information
- Handle missing data gracefully
- Return consistent JSON structure
- Work with various text formats

## 📁 Supported File Types

- **WhatsApp Chat Exports**: `.txt` files exported from WhatsApp
- **Plain Text Files**: Any `.txt` file containing menu information
- **Menu Descriptions**: Text files with food item descriptions

## 🔧 Configuration

### File Size Limits
- Maximum file size: 10MB
- Supported format: `.txt` only

### AI Model Settings
- Model: Gemini 1.5 Flash
- Temperature: Default (for consistent results)
- Max tokens: Default

## 🐛 Troubleshooting

### Common Issues

1. **"No file provided" error**
   - Ensure you're uploading a `.txt` file
   - Check file size is under 10MB

2. **Gemini API errors**
   - Verify your API key is correct
   - Check you have sufficient credits
   - Ensure API key has proper permissions

3. **Database connection errors**
   - Verify all Postgres environment variables are set
   - Check Vercel database is active
   - Ensure connection string is correct

4. **Empty results**
   - Try with a different text file
   - Ensure the file contains food-related content
   - Check file encoding (should be UTF-8)

## 📊 Performance

- **File Processing**: Typically 2-5 seconds for small files
- **Database Operations**: Optimized queries with proper indexing
- **UI Responsiveness**: Real-time updates and loading states

## 🔒 Security

- API keys stored as environment variables
- File upload validation and sanitization
- SQL injection prevention with parameterized queries
- CORS protection on API routes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for the powerful GPT API
- Vercel for hosting and database services
- Next.js team for the amazing framework
- Tailwind CSS for beautiful styling

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section
2. Search existing GitHub issues
3. Create a new issue with detailed information

---

**Happy Menu Extracting! 🍽️✨**
# Chutki_task
