'use client';

import { useState } from 'react';
import Image from 'next/image'

export default function Testing() {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const CHUNK_SIZE = 1024 * 50;

    // Converts a file chunk to a Base64 string
    const convertToBase64 = (fileChunk: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(fileChunk); // Convert file chunk to Base64
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    // Handles file input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
            setProgress(0); // Reset progress when a new file is selected
        }
    };

    // Function to upload file chunks as Base64
    const uploadChunks = async (currentChunk: number, chunkSize: number, totalChunks: number) => {
        if (!file) return;

        const start = currentChunk * chunkSize;
        const end = Math.min(start + chunkSize, file.size);
        const fileChunk = file.slice(start, end);

        // Convert the chunk to Base64
        const base64Chunk = await convertToBase64(fileChunk);

        // Send the Base64 chunk to the server
        const response = await fetch('http://localhost:1000/api/uploadFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accessToken': `${localStorage.getItem('token')}`,
                'fileName': `${file.name}`,
                'fileSize': `${file.size}`,
                'fileType': `${file.type}`,
                'totalChunks': `${totalChunks}`,
                'currentChunk': `${currentChunk}`,
            },
            body: JSON.stringify({ chunk: base64Chunk }), // Send chunk as JSON
        });

        if (!response.ok) {
            throw new Error('Failed to upload chunk');
        }

        // Update progress
        setProgress(((currentChunk + 1) / totalChunks) * 100);
    };

    // Initiates the upload process
    const handleUpload = async () => {
        if (!file) return;

        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

        for (let i = 0; i < totalChunks; i++) {
            await uploadChunks(i, CHUNK_SIZE, totalChunks);
            console.log(`Uploading chunk ${i + 1} of ${totalChunks}`);
        }
    };

    return (
        <div className="p-4">
            <input
                onChange={handleChange}
                type="file"
                id="fileInput"
                className="mb-4"
            />
            {file && (
                <div>
                    <p className="mb-4">Selected file: {file.name}</p>
                    <div className="relative w-auto  mx-auto h-96">
                        <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            layout="fill"
                            objectFit='cover'
                            objectPosition='center'
                            className="rounded-2xl"
                        />
                    </div>
                    <div>
                        <button
                            onClick={handleUpload}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Upload File
                        </button>
                        <div className="mt-4">
                            <div className="w-full bg-gray-300 h-4 rounded">
                                <div
                                    className="bg-green-500 h-4 rounded"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-center mt-2">{progress.toFixed(2)}%</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
