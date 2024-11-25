'use client'

import React from "react"
import Stories from "@/app/components/Stories"
import DashProfile from "@/app/components/DashProfile"
import Link from "next/link"
import DashContact from "@/app/components/DashContacts"
import * as icons from 'react-icons/fa'

export default function Dashboard() {

    return (
        <div className="grid grid-cols-4 grid-flow-row gap-4 h-full">
            <div className="flex flex-col border-r-2 border-black  h-full">
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
                                size={'1.5em'}  />
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
                className="col-span-2"
            >
                <Stories />
            </div>
            <div></div>
        </div >
    )

}