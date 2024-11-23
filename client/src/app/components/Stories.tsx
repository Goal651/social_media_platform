'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Story {
    id: string
    title: string
    content: string
}

const Stories = (): JSX.Element => {
    const [stories, setStories] = useState<Story[]>([])

    useEffect(() => {
        fetch('http://localhost:1000/stories')
            .then(response => response.json())
            .then(data => setStories(data))
            .catch(error => console.error(error))
    }, [])
    console.log(stories)

    return (
        <div className="">
            <div className='flex justify-between px-20'>
                <h1 className='text-3xl text-left font-semibold'>Stories</h1>
                <Link href="/create">Watch all</Link>
            </div>
            <div className="carousel rounded-box w-full h-full space-x-10" >
                <div className=" carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'

                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                        alt="Burger"
                        className='rounded-full'

                        width={100}
                        height={100}
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'

                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </div><div className=" carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'

                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                        alt="Burger"
                        className='rounded-full'

                        width={100}
                        height={100}
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'

                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </div><div className=" carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'

                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                        alt="Burger"
                        className='rounded-full'

                        width={100}
                        height={100}
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'

                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </div><div className=" carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'

                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                        alt="Burger"
                        className='rounded-full'

                        width={100}
                        height={100}
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'

                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </div>
                <div className="carousel-item">
                    <Image
                        src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                        alt="Burger"
                        width={100}
                        height={100}
                        className='rounded-full'
                    />
                </div>
            </div>
        </div>
    )
}
export default Stories