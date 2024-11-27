'use client'
import Posts from "@/app/components/Posts"

export default function Feeds() {

    return (
        <div className="w-full ">
            <div className="flex justify-between">
                <div className="font-semibold text-2xl w-1/2">Feed</div>
                <div className="flex justify-evenly w-1/2">
                    <button className="btn text-white bg-purple-900 px-8 rounded-xl">Popular</button>
                    <button className="btn text-purple-900 bg-slate-100 px-8 rounded-xl">Latest</button>
                </div>
            </div>
            <div className="flex flex-col py-10 h-screen overflow-y-auto">
                <Posts />
            </div>
        </div>
    )
}