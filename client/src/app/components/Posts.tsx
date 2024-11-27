/* eslint-disable @next/next/no-img-element */
'use client'

import Image from "next/image";
import Gallery from "@/app/components/Gallery"; // Import the Gallery component

export default function Posts() {
    // Dynamic photo data
    const photos = [
        "/user.png", // Highlighted photo
        "/userPro.png",
        "/user.png",
        "/user.png",
        "/userPro.png",
        "/user.png",
        "/user.png", 
        "/userPro.png",
    ];

    return (
        <div className="flex flex-col gap-y-2 bg-gradient-to-r from-purple-300 to-purple-400 rounded-xl">
            {/* Header Section */}
            <div className="flex justify-start items-center p-4">
                <div className="rounded-full">
                    <Image
                        src={'/nopro.png'}
                        alt='Profile'
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                </div>
                <div className="flex flex-col justify-start ml-4">
                    <div className="font-semibold">Versal_official</div>
                    <div>#Milan, Italy</div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="flex justify-center items-center">
                <Gallery photos={photos} />
            </div>
        </div>
    );
}
