'use client';

import { useEffect,useState } from 'react';

interface ParamsInterface {
    uploadType: string;
    files: File[] | null;
    totalFiles: number;
    onFileUpload: (fileName: string) => void;
}

export default function Testing(params: ParamsInterface) {
    const CHUNK_SIZE = 1024 * 50;

    const [uploading, setUploading] = useState(false);
    const convertToBase64 = (fileChunk: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(fileChunk);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    const uploadChunksRecursive = async (currentChunk: number, totalChunks: number, file: File): Promise<void> => {
        const start = currentChunk * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const fileChunk = file.slice(start, end);

        const base64Chunk = await convertToBase64(fileChunk);

        const response = await fetch('http://localhost:1000/api/uploadFile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                accessToken: `${localStorage.getItem('token')}`,
                fileName: `${file.name}`,
                fileSize: `${file.size}`,
                fileType: `${file.type}`,
                totalChunks: `${totalChunks}`,
                currentChunk: `${currentChunk}`,
            },
            body: JSON.stringify({ chunk: base64Chunk }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(`Failed to upload chunk of ${file.name}`);

        params.onFileUpload(data.fileName);

        if (currentChunk + 1 < totalChunks) {
            await uploadChunksRecursive(currentChunk + 1, totalChunks, file);
        }
    };

    const uploadFilesRecursive = async (fileIndex: number): Promise<void> => {
        if (!params.files || fileIndex >= params.files.length) return;

        const file = params.files[fileIndex];
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

        try {
            await uploadChunksRecursive(0, totalChunks, file);
        } catch (error) {
            console.error(`Error uploading file ${file.name}:`, error);
            return; // Skip to next file on error
        }

        // Upload the next file
        await uploadFilesRecursive(fileIndex + 1);
    };

    useEffect(() => {
        const handleUpload = async () => {
            if (!params.files || params.files.length === 0) return;

            try {
                setUploading(true);
                await uploadFilesRecursive(0);
                setUploading(false)
            } catch (error) {
                console.error('Error uploading files:', error);
            }
        };

        handleUpload();
    }, [params.files]);

    return (
        <>
            {uploading && <p>Uploading...</p>}
        </>
    );
}
