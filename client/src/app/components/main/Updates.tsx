import Link from "next/link";
import Stories from "@/app/components/main/Stories";
import Feeds from "@/app/components/main/Feeds";
import { FaSearch } from "react-icons/fa";


export default function Updates() {

    return (
        <div
            className="w-3/5 col-span-2 flex flex-col gap-y-10 p-4 rounded-xl h-screen overflow-auto hide-scrollbar scroll-smooth bg-gradient-to-r from-purple-50  via-purple-50 to-purple-200"
        >
            <div className="w-full flex justify-between">
                <div className="w-fit ">
                    <label className="input  flex items-center gap-2 bg-transparent focus:outline-0 active:outline-0 bg-gradient-to-r from-slate-200 to-purple-100 rounded-3xl">
                        <FaSearch
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
                        className="btn border-0 bg-gradient-to-r from-slate-300 to-purple-500 px-5 text-black"
                    >
                        + create new post
                    </Link>
                </div>
            </div>
            <Stories />
            <Feeds />
        </div>
    )
}