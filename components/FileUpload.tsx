'use client'

import { useRef, useState } from 'react'
import { MenuItem } from '@/types/menu'

interface FileUploadProps {
  onFileProcessed: (items: MenuItem[]) => void
  onError: (error: string) => void
  onProcessingStart: () => void
  isProcessing: boolean
}

export default function FileUpload({ 
  onFileProcessed, 
  onError, 
  onProcessingStart, 
  isProcessing 
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.txt')) {
      onError('Please upload a .txt file')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      onError('File size must be less than 10MB')
      return
    }

    onProcessingStart()

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/extract-menu', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to process file')
      }

      const data = await response.json()
      onFileProcessed(data.items)
    } catch (error) {
      console.error('Error processing file:', error)
      onError(error instanceof Error ? error.message : 'Failed to process file')
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Text File</h2>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-900">
              {isProcessing ? 'Processing...' : 'Drop your .txt file here'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to browse files
            </p>
          </div>
          
          <div className="text-xs text-gray-400">
            <p>Supported formats: .txt</p>
            <p>Maximum file size: 10MB</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium mb-2">Supported file types:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>WhatsApp chat exports (.txt)</li>
          <li>Any text file containing food menu information</li>
          <li>Plain text files with menu descriptions</li>
        </ul>
      </div>
    </div>
  )
}
