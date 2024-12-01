/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from 'react'

interface User {
    _id: string,
    names: string,
    email: string,

}

export default function DashProfile() {
    const [userDetails, setUserDetails] = useState<User | null>()
    const [loading, setLoading] = useState(true)

    const fetchUserDetails = async () => {
        try {

            const response = await fetch('http://localhost:1000/api/fetchCurrentUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    accessToken: `${localStorage.getItem('token')}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUserDetails(data.userDetails);
            }
        } catch (error) {
            console.error(error)
        } finally { setLoading(false) }

    }

    useEffect(() => {
        fetchUserDetails()
    }, [])


    return (
        <div className=' m-4 px-2 h-fit bg-purple-100 rounded-2xl text-black'>
            {loading && (
                <div>
                    <div className='loading loading-ring' />
                </div>
            )}
            {userDetails||!userDetails && (
                <div className='flex flex-col space-y-4 items-center'>
                    <div className=' w-full flex flex-col items-center h-fit'>
                        <div className='rounded-2xl bg-black w-full place-items-center'>
                            <img
                                src={'/user.png'}
                                alt='profile'
                                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                                className='rounded-2xl'
                            />
                        </div>
                        <div className='relative z-10 w-fit bottom-10  bg-blue-500 rounded-full'>
                            <img
                                src={'/userPro.png'}
                                alt='profile'
                                className='rounded-full'
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className='relative bottom-10 '>
                        <div className='font-semibold text-center '>Chance_the_lotus</div>
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
                            <img
                                src={'/user.png'}
                                alt='profile'
                                style={{ width: '100%', height: '100px', objectFit: 'cover' }}
                                className='rounded-2xl'
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
