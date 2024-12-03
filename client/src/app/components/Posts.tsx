/* eslint-disable @next/next/no-img-element */
'use client'

import Image from "next/image";
import Gallery from "@/app/components/Gallery"; // Import the Gallery component
import { FaRegComment, FaRegHeart } from 'react-icons/fa';

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
        <div className="flex flex-col gap-y-2 bg-gradient-to-r from-purple-300 to-purple-400 rounded-xl text-black">
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
            <div>
                <div className="flex justify-start space-x-8  p-4">
                    <button className="flex items-center space-x-2">
                        <FaRegHeart
                            className="text-black"
                            size={20} />
                        <span
                            className="text-black text-lg font-medium">
                            12.5k
                        </span>
                    </button>
                    <button className="flex items-center space-x-2">
                        <FaRegComment
                            className="text-black"
                            size={20} />
                        <span
                            className="text-black text-lg font-medium">
                            45k
                        </span>

                    </button>
                </div>
            </div>
        </div>
    );
}
