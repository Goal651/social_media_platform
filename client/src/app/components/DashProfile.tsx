'use client'

import Image from "next/image"

export default function DashProfile() {


    return (
        <div className=' m-4 px-2 h-fit bg-purple-100 rounded-2xl text-black'>
            <div className='flex flex-col space-y-4 items-center'>
                <div className=' w-full flex flex-col items-center h-fit'>
                    <div className='rounded-4xl bg-black w-full place-items-center'>
                        <Image
                            height={100}
                            width={1000}
                            src={'/user.png'}
                            alt='profile'
                            className='rounded-2xl w-full h-32 object-cover'
                        />
                    </div>
                    <div className='relative z-10 w-fit bottom-10  bg-blue-500 rounded-full'>
                        <Image
                            height={500}
                            width={500}
                            src={'/nopro.png'}
                            alt='profile'
                            className='rounded-full w-20 h-20 object-cover'
                        />
                    </div>
                </div>
                <div className='relative bottom-10 '>
                    <div className='font-semibold text-center '>Wilson</div>
                    <div className='font-semibold text-center '>Texas, United States</div>
                </div>
                <div className='relative bottom-10  flex w-full justify-evenly *:font-semibold'>
                    <div className='flex flex-col items-center'>
                        <div>397</div>
                        <div>posts</div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div>123k</div>
                        <div>followers</div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <div>1074</div>
                        <div>following</div>
                    </div>
                </div>
                <div className='w-full relative bottom-10 '>
                    <div className='rounded-2xl bg-black w-full place-items-center'>
                        <Image
                            height={500}
                            width={500}
                            src={'/user.png'}
                            alt='profile'
                            className='rounded-2xl w-full h-20 object-cover'
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
