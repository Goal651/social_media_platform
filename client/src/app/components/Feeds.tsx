'use client'
import Posts from "@/app/components/Posts"

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

export default function Feeds() {
    const photos = [
        'user.png',
        'nopro.png',
        'contact.png',
        'user.png',
        'nopro.png',
        'contact.png'
    ]
    const userDetails = {
        username: 'Wilson Goal'
        , location: 'Muhanga City',
        image: 'userPro.png'
    }

    const postDetails = {
        liked: true,
        comments: ['s', 'tq', 't']
    }

    const posts: Post[] = [{
        photos,
        userDetails,
        postDetails
    },
    {
        photos,
        userDetails,
        postDetails
    },
    ]

    return (
        <div className="w-full ">
            <div className="flex justify-between">
                <div className="font-semibold text-2xl w-1/2 text-black">Feeds</div>
                <div className="flex justify-evenly w-1/2">
                    <button className="btn border-0 text-white bg-purple-900 px-8 rounded-xl">Popular</button>
                    <button className="btn border-0 text-purple-900 bg-slate-100 px-8 rounded-xl">Latest</button>
                </div>
            </div>
            <div className="flex flex-col py-10  gap-y-8">
                {posts.map((post,index) => (
                    <Posts key={index} post={post} />
                ))}
            </div>
        </div>
    )
}