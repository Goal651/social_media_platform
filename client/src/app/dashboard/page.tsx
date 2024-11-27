'use client'

import React from "react"
import Stories from "@/app/components/Stories"
import DashProfile from "@/app/components/DashProfile"
import Link from "next/link"
import DashContact from "@/app/components/DashContacts"
import Feeds from "@/app/components/Feeds"
import ActivityCard from "@/app/components/ActivityCard"
import SuggestionCard from "@/app/components/SuggestionCard"
import * as icons from 'react-icons/fa'

export default function Dashboard() {

    return (
        <div className="grid grid-cols-4 grid-flow-row gap-4 h-full overflow-hidden">
            <div className="flex flex-col border-r-2 border-black  h-screen overflow-y-auto hide-scrollbar scroll-smooth">
                <div className="">
                    <DashProfile />
                </div>
                <div className=''>
                    <div className="bg-slate-100 h-fit flex flex-col items-center *:font-semibold gap-y-5 my-2 mx-4 py-4">
                        <div className="flex flex-col gap-y-10 items-start ">
                            <Link className="flex space-x-4 w-full "
                                href={'/dashboard'}
                            >
                                <icons.FaHome
                                    size={'1.5em'} />
                                <div>Home</div>
                            </Link>
                            <Link
                                className="flex space-x-4 w-full "
                                href={'/dashboard'}
                            >
                                <icons.FaCompass
                                    size={'1.5em'} />
                                <div>Explore</div>
                            </Link>
                            <Link
                                className="flex space-x-4 w-full "
                                href={'/dashboard'}
                            >
                                <icons.FaBookmark
                                    size={'1.5em'} />
                                <div> My favourites</div>
                            </Link>
                            <Link
                                className="flex space-x-4 w-full "
                                href={'/dashboard'}
                            >
                                <icons.FaEnvelope
                                    size={'1.5em'} />
                                <div> Message</div>
                            </Link>
                            <Link
                                className="flex space-x-4 w-full "
                                href={'/dashboard'}
                            >
                                <icons.FaBell
                                    size={'1.5em'} />
                                <div> Notification</div>
                            </Link>
                            <Link
                                className="flex space-x-4 w-full "
                                href={'/dashboard'}
                            >
                                <icons.FaCog
                                    size={'1.5em'} />
                                <div> Setting</div>
                            </Link>

                        </div>
                    </div>
                </div>
                <div className="">
                    <DashContact />
                </div>
            </div>

            <div
                className="col-span-2 flex flex-col gap-y-10 p-4 rounded-xl h-screen overflow-auto hide-scrollbar scroll-smooth bg-gradient-to-r from-purple-50 via-purple-50 via-purple-50 to-purple-300"
            >
                <div className="w-full flex justify-between">
                    <div className="w-fit ">
                        <label className="input  flex items-center gap-2 bg-transparent focus:outline-0 active:outline-0 bg-gradient-to-r from-slate-300 to-purple-200 rounded-2xl">
                            <icons.FaSearch
                                color="#9CA3AF"
                                className="text-sm"
                                size={'1.5em'} />
                            <input
                                type="text"
                                className="grow  placeholder:text-black placeholder:font-extralight active:outline-0"
                                placeholder="Search" />
                        </label>
                    </div>

                    <div>
                        <Link
                            href={'/createStory'}
                            className="btn border-0 bg-gradient-to-r from-slate-300 to-purple-500 px-5"
                        >
                            + create new post
                        </Link>
                    </div>
                </div>
                <Stories />
                <Feeds />
            </div>
            <div className="h-screen overflow-auto flex flex-col gap-y-10 scroll-smooth hide-scrollbar">
                <ActivityCard />
                <SuggestionCard />
            </div>
        </div >
    )

}