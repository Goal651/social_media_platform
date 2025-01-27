'use client';

import { useEffect, useState } from 'react';

interface ParamsInterface {
    uploadType: string;
    files: File[] | null;
    totalFiles: number;
    onFileUpload: (fileName: string) => void;
}

export default function Testing(params: ParamsInterface) {
    const CHUNK_SIZE = 1024 * 50;
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState<number[]>([]);
    const accessToken = localStorage.getItem('token')

    const convertToBase64 = (fileChunk: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(fileChunk);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const uploadChunksRecursive = async (currentChunk: number, totalChunks: number, file: File, fileIndex: number): Promise<void> => {
        const start = currentChunk * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const fileChunk = file.slice(start, end);

        const base64Chunk = await convertToBase64(fileChunk);

        await fetch('http://localhost:1000/api/uploadFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accessToken: `${accessToken}`,
                fileName: `${file.name}`,
                fileSize: `${file.size}`,
                fileType: `${file.type}`,
                totalChunks: `${totalChunks}`,
                currentChunk: `${currentChunk}`,
            },
            body: JSON.stringify({ chunk: base64Chunk }),
        });

        const progressCopy = [...progress];
        progressCopy[fileIndex] = Math.min(((currentChunk + 1) / totalChunks) * 100, 100);
        setProgress(progressCopy);

        if (currentChunk + 1 < totalChunks) {
            await uploadChunksRecursive(currentChunk + 1, totalChunks, file, fileIndex);
        } else {
            params.onFileUpload(file.name);
        }
    };

    useEffect(() => {
        const handleUpload = async () => {
            if (!params.files || params.files.length === 0) return;

            try {
                setUploading(true);
                const initialProgress = params.files.map(() => 0);
                setProgress(initialProgress);

                for (let i = 0; i < params.files.length; i++) {
                    const file = params.files[i];
                    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
                    await uploadChunksRecursive(0, totalChunks, file, i);
                }
            } catch (error) {
                console.error('Error uploading files:', error);
            } finally {
                setUploading(false);
            }
        };

        handleUpload();
    }, [params.files]);

    return (
        <div>
            {uploading && (
                <div>
                    {params.files?.map((file, index) => (
                        <div key={index} className="mb-2">
                            <p className="text-sm">{file.name}</p>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-blue-500 h-4 rounded-full"
                                    style={{ width: `${progress[index]}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
