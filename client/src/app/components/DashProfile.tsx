'use client'

import Image from 'next/image'
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
        <div className='px-10'>
            {loading && (
                <div>
                    <p>Loading...</p>
                </div>
            )}
            {userDetails && (
                <div>
                    <div className='indicator w-full'>
                        <div className='rounded-2xl bg-black w-full place-items-center'>
                            <Image
                                src={'/nopro.png'}
                                width={100}
                                alt='profile'
                                height={100}
                            />
                        </div>
                        <div className='indicator-item indicator-bottom  bg-blue-500 rounded-full'>
                            <Image
                                src={'/nopro.png'}
                                width={50}
                                alt='profile'
                                height={50}
                                className='rounded-full'
                            />
                        </div>

                    </div>
                    <div>{userDetails.names}</div>
                </div>
            )}
        </div>
    )
}