'use client'

import Image from "next/image"
import Link from "next/link"

export default function DashContact() {

    return (
        <div className="flex flex-col items-center *:font-semibold  bg-purple-100 rounded-2xl m-4 py-2 text-black">
            <div className="flex justify-evenly w-full">
                <Link href={'/dashboard'} className="link link-hover">Contacts</Link>
                <Link href={'/dashboard'} className="link link-hover text-indigo-700">
                    See all
                </Link>
            </div>
            <div className="flex flex-col gap-y-5">
                <div className="w-full flex flex-row justify-evenly items-center">
                    <div className="rounded-full">
                        <Image
                            src="/contact.png"
                            alt=''
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold">K_Anitha</div>
                        <div className="text-xs">Kigali, Rwanda </div>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-evenly items-center">
                    <div className="rounded-full">
                        <Image
                            src="/nopro.png"
                            alt=''
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold">K_Anitha</div>
                        <div className="text-xs">Kigali, Rwanda </div>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-evenly items-center">
                    <div className="rounded-full">
                        <Image
                            src="/nopro.png"
                            alt=''
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold">K_Anitha</div>
                        <div className="text-xs">Kigali, Rwanda </div>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-evenly items-center">
                    <div className="rounded-full">
                        <Image
                            src="/nopro.png"
                            alt=''
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold">K_Anitha</div>
                        <div className="text-xs">Kigali, Rwanda </div>
                    </div>
                </div>
                <div className="w-full flex flex-row justify-evenly items-center">
                    <div className="rounded-full">
                        <Image
                            src="/nopro.png"
                            alt=''
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold">K_Anitha</div>
                        <div className="text-xs">Kigali, Rwanda</div>
                    </div>
                </div>
            </div>
        </div>
    )
}