'use client'

import { useState } from 'react'
import FileUpload from '@/components/FileUpload'
import MenuDisplay from '@/components/MenuDisplay'
import { MenuItem } from '@/types/menu'

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileProcessed = (items: MenuItem[]) => {
    setMenuItems(items)
    setIsProcessing(false)
    setError(null)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setIsProcessing(false)
  }

  const handleProcessingStart = () => {
    setIsProcessing(true)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🍽️ Food Menu Extractor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a text file (like WhatsApp chat export) and let AI extract structured food menu data for you.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <FileUpload
            onFileProcessed={handleFileProcessed}
            onError={handleError}
            onProcessingStart={handleProcessingStart}
            isProcessing={isProcessing}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="animate-spin h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Processing</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>AI is analyzing your file and extracting menu items...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {menuItems.length > 0 && (
          <MenuDisplay menuItems={menuItems} />
        )}
      </div>
    </main>
  )
}
