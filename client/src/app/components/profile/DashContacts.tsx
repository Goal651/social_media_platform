'use client';

import Image from "next/image";
import Link from "next/link";
import { BiComment, BiTagAlt } from "react-icons/bi";

export default function DashContact() {
    return (
        <div className="flex flex-col items-center bg-purple-100 rounded-2xl m-4 py-2 text-black">
            <div className="flex justify-evenly w-full">
                <Link href={'/dashboard'} className="link link-hover">Contacts</Link>
                <Link href={'/dashboard'} className="link link-hover text-indigo-700">
                    See all
                </Link>
            </div>
            <div className="flex flex-col gap-y-5 w-full">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full flex flex-row justify-evenly items-center">
                        {/* User Information */}
                        <div className="flex space-x-4">
                            <div className="rounded-full overflow-hidden relative w-10 h-10">
                                <Image
                                    src="/contact.png"
                                    alt=""
                                    height={500}
                                    width={500}
                                    className="object-cover rounded-full "
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="font-semibold">K_Anitha</div>
                                <div className="text-xs">Kigali, Rwanda</div>
                            </div>
                        </div>
                        {/* Icons */}
                        <div className="flex space-x-4">
                            <div className="rounded-full p-1">
                                <BiComment className="text-black" size="1.5em" />
                            </div>
                            <div className="rounded-full p-1">
                                <BiTagAlt className="text-black" size="1.5em" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
