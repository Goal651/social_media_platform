'use client'

import Image from "next/image"
import Gallery from "@/app/components/Gallery" // Import the Gallery component
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { useState } from "react"

interface Post {
    userDetails: {
        image: string,
        location: string
        username: string
    },
    photos: string[],
    postDetails: {
        liked: boolean,
        comments: string[]
    }
}

export default function Posts({post}:{post:Post}) {
    const [isPhotoLiked, setIsPhotoLiked] = useState(false)

    return (
                <>
                    <div className="flex flex-col p-2 gap-y-2 bg-slate-300  text-black">
                        {/* Header Section */}
                        <div className="flex justify-start items-center p-4">
                            <div className="rounded-full relative w-20 h-20">
                                <Image
                                    src="/contact.png"
                                    alt=""
                                    layout="fill"
                                    className="object-cover rounded-full"
                                />
                            </div>
                            <div className="flex flex-col justify-start ml-4">
                                <div className="font-semibold">{post.userDetails.username}</div>
                                <div>{post.userDetails.location}</div>
                            </div>
                        </div>

                        {/* Gallery Section */}
                        <div className="flex justify-center items-center">
                            <Gallery photos={post.photos} />
                        </div>
                        <div>
                            <div className="flex justify-start space-x-8  p-4">
                                <button className="flex items-center space-x-2">
                                    <FaRegHeart
                                        onClick={() => { setIsPhotoLiked(!isPhotoLiked) }}
                                        className={`${isPhotoLiked ? 'text-pink-600' : 'text-black'} `}
                                        size={20} />
                                    <span
                                        className="text-black text-lg font-medium">
                                        {post.postDetails.liked}
                                    </span>
                                </button>
                                <button className="flex items-center space-x-2">
                                    <FaRegComment
                                        className="text-black"
                                        size={20} />
                                    <span
                                        className="text-black text-lg font-medium">
                                        {post.postDetails.comments.length}k
                                    </span>

                                </button>
                            </div>
                        </div>
                    </div>
                </>
            
        
    )
}
