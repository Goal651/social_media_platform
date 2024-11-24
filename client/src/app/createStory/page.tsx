/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Uploader from '@/app/components/Uploader';

const AddStory = (): JSX.Element => {
    const [content, setContent] = useState<string>('');
    const [images, setImages] = useState<File[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [postFileUrls, setPostFileUrls] = useState<string[]>([]);
    const [error, setError] = useState('');

    // Handle file selection for multiple images
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImages(Array.from(event.target.files));
        }
    };

    // Add each uploaded file's URL to the list
    const handleDataFromUploader = (data: string) => {
        setPostFileUrls((prevUrls) => [...prevUrls, data]);
    };

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        const validFilePaths = postFileUrls.filter((path) => path != null);
        const uniqueFilePaths = [...new Set(validFilePaths)];


        const dataToSend = {
            content,
            statusFileUrls: uniqueFilePaths,
            statusType: 'status',
        };

        try {
            const response = await fetch('http://localhost:1000/api/createStatus', {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: {
                    'Content-Type': 'application/json',
                    accessToken: `${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                console.log(response);
            } else {
                setError('An error occurred while submitting your story');
            }
        } catch (error) {
            console.error('Error submitting story:', error);
            alert('An error occurred while submitting your story');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center">
            <h1 className="text-3xl font-semibold mb-4">Add Story</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 p-4">
                <div>
                    <label htmlFor="content" className="block text-lg font-medium">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                        rows={5}
                    />
                </div>
                <div>
                    <label htmlFor="images" className="block text-lg font-medium">Images</label>
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
                        <div key={index} className="w-full h-24 border rounded-md overflow-hidden">
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md disabled:bg-gray-400"
                    >
                        {isSubmitting ? 'Submitting...' : 'Add Story'}
                    </button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </form>
        </div>
    );
};

export default AddStory;
