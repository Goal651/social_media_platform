/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Story {
    _id: string;
    creator: {
        names: string;
        _id: string;
    };
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

    const getLatestImagesByCreator = () => {
        const creatorMap = new Map<string, { creator: string; file: string }>();

        stories.forEach((story) => {
            if (Array.isArray(story.files) && story.files.length > 0) {
                // Select the last file from the story
                const latestFile = story.files[story.files.length - 1];
                // Update the map if the creator is new or this story is more recent
                if (!creatorMap.has(story.creator._id) || story._id > creatorMap.get(story.creator._id)!.file) {
                    creatorMap.set(story.creator._id, { creator: story.creator.names, file: latestFile });
                }
            }
        });

        return Array.from(creatorMap.values());
    };

    const latestImages = getLatestImagesByCreator();

    const defaultImages = [
        'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
        'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
        'https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp',
        'https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp',
    ];

    return (
        <div className="h-fit w-full flex flex-col gap-y-4 text-black">
            <div className="flex justify-between px-20">
                <h1 className="text-3xl text-left font-extrabold">Stories</h1>
                <Link className="link link-hover text-blue-900 font-semibold" href="/create">Watch all</Link>
            </div>
            <div className="carousel rounded-box w-full h-full space-x-10">
                <Link href={'/createStory'} className="carousel-item flex-col">
                    <div className="indicator">
                        <span className="w-5 h-5 badge indicator-item indicator-bottom bg-purple-700 text-white text-xl rounded-none p-0 bottom-2 right-2">+</span>
                        <div className="grid h-[70px] w-[70px] place-items-center">
                            <div className="rounded-full bg-slate-200 p-5">
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
                {latestImages.length > 0
                    ? latestImages.map(({ creator, file }) => (
                        <CarouselItem key={creator} alt={creator} imageUrl={file} />
                    ))
                    : defaultImages.map((imageUrl, index) => (
                        <CarouselItem key={index} imageUrl={imageUrl} alt={`Default story ${index + 1}`} />
                    ))}
            </div>
        </div>
    );
};

export default Stories;
;

