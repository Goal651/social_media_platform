import Link from "next/link";
import * as icons from 'react-icons/fa'
import DashContact from "@/app/components/profile/DashContacts";
import DashProfile from "@/app/components/profile/DashProfile";


export default function DashPro() {
    return (
        <div className="w-1/5 flex flex-col border-r-2 border-black  h-screen overflow-y-auto hide-scrollbar scroll-smooth">
            <div className="">
                <DashProfile />
            </div>
            <div className=''>
                <div className="bg-slate-100 h-fit flex flex-col items-center *:font-semibold gap-y-5 my-2 mx-4 py-4">
                    <div className="flex flex-col gap-y-10 items-start text-black">
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
    )
}