/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Uploader from '@/app/components/Uploader'

const AddStory = (): JSX.Element => {
    const [content, setContent] = useState<string>('')
    const [images, setImages] = useState<File[]>([])
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [postFileUrls, setPostFileUrls] = useState<string[]>([])
    const [error, setError] = useState('')
    const [accessToken, setAccessToken] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token') || ""
        console.log(token)
        if (token) setAccessToken(token)
    }, [])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImages(Array.from(event.target.files))
            console.log(event.target.files[0])
        }
    }

    const handleDataFromUploader = (data: string) => {
        setPostFileUrls((prevUrls) => [...prevUrls, data])
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsSubmitting(true)

        const uniqueFilePaths = Array.from(new Set(postFileUrls))

        const dataToSend = {
            content,
            statusFileUrls: uniqueFilePaths,
            statusType: 'status',
        }

        try {
            const response = await fetch('http://localhost:1000/api/createStatus', {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: {
                    'Content-Type': 'application/json',
                    accessToken: accessToken,
                },
            })

            if (response.ok) {
                alert('Story added successfully!')
                setContent('')
                setImages([])
                setPostFileUrls([])
            } else {
                setError('Failed to submit your story. Please try again.')
            }
        } catch (error) {
            console.error('Error submitting story:', error)
            setError('An unexpected error occurred. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="h-full w-full flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-4">Add Story</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 p-4 bg-white shadow-lg rounded-md">
                <div>
                    <label htmlFor="content" className="block text-lg font-medium mb-1">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        rows={5}
                    />
                </div>
                <div>
                    <label htmlFor="images" className="block text-lg font-medium mb-1">Images</label>
                    <input
                        type="file"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="w-full px-4 py-2 border rounded-md"
                    />
                    <Uploader
                        uploadType="status"
                        files={images}
                        onFileUpload={handleDataFromUploader}
                        totalFiles={images.length}
                    />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                    {images.map((image, index) => (
                        <div key={index} className="w-full h-24 border rounded-md overflow-hidden shadow-sm">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-end space-x-2">
                    <Link href="/dashboard">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {isSubmitting ? 'Submitting...' : 'Add Story'}
                    </button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
        </div>
    )
}

export default AddStory
