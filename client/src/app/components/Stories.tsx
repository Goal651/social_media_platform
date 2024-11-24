/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Story {
    _id: string;
    creator: string;
    content: string;
    files: string[];
}
const CarouselItem = ({ imageUrl, alt }: { imageUrl: string; alt: string }) => {
    const isBase64 = imageUrl.startsWith('data:image/');

    return (
        <div className="carousel-item flex flex-col ">
            <div className='border rounded-full'>
                {isBase64 ? (
                    <img
                        src={imageUrl}
                        alt={alt}
                        className="rounded-full"
                        style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                    />
                ) : (
                    <Image
                        src={imageUrl}
                        alt={alt}
                        width={100}
                        height={100}
                        className="rounded-full"
                        unoptimized
                    />
                )}
            </div>
            {<p className="text-sm text-center font-semibold mt-2">
                {alt}
            </p>}
        </div>
    );
};


const Stories = (): JSX.Element => {
    const [stories, setStories] = useState<Story[]>([]);

    const fetchStatuses = async () => {
        try {
            const response = await fetch('http://localhost:1000/api/fetchAllStatuses', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    accessToken: `${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setStories(data.allStatuses);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStatuses();
    }, []);

    const defaultImages = [
        'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
        'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
        'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
        'https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp',
    ];
    return (
        <div className="h-full w-full">
            <div className="flex justify-between px-20">
                <h1 className="text-3xl text-left font-semibold">Stories</h1>
                <Link href="/create">Watch all</Link>
            </div>
            <div className="carousel rounded-box w-full h-full space-x-10">
                <Link href={'/createStory'} className="carousel-item flex-col indicator">
                    <div>
                        <span className="badge indicator-item indicator-bottom bottom-20 right-2 rounded place-items-center w-5 h-5 bg-slate-400 text-white">
                            +
                        </span>
                        <div className="grid h-[70px] w-[70px] place-items-center">
                            <div className="rounded-full bg-slate-400 p-5">
                                <Image
                                    src="/no_profile.svg"
                                    alt="Add Story"
                                    className="rounded-full"
                                    objectFit="cover"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </div>
                    </div>
                    <div>Add Story</div>
                </Link>

                {/* Dynamic Carousel Items */}
                {stories && stories.length > 0
                    ? stories.map(story =>
                        Array.isArray(story.files) && story.files.length > 0
                            ? story.files.map(file => (
                                <CarouselItem
                                    key={`${story._id}-${file}`}
                                    alt={story.creator?.names}
                                    imageUrl={file}
                                />
                            ))
                            : null
                    )
                    : defaultImages.map((imageUrl, index) => (
                        <CarouselItem
                            key={index}
                            imageUrl={imageUrl}
                            alt={`Default story ${index + 1}`}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Stories;
