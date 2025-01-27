/* eslint-disable @next/next/no-img-element */
'use client'

import { useEffect, useState } from "react"

interface User {
    username: string
    image: string
    names: string
    email: string
    id: string
    file?: string
}


export default function DashProfile() {
    const loading = false
    const sessionUser: User = JSON.parse(sessionStorage.getItem('user') || '{}')
    const [user, setUser] = useState<User | null>(sessionUser as User)
    const [loadingPic, setLoadingPic] = useState(true)

    const fetchCurrentUser = async () => {
        if (user?.image === '') return setLoadingPic(false)
        try {
            const response = await fetch(`http://localhost:1000/api/getFile/${user?.image}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    accessToken: `${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (response.status === 200) {
                setUser(prev => {
                    if (prev) return { ...prev, file: data.file }
                    return prev
                });
                setLoadingPic(false)
            }
            else if (response.status === 400) localStorage.setItem("token", data.token)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchCurrentUser()
    }, [])

    return (
        <div className=' m-4 px-2 h-fit bg-purple-100 rounded-2xl text-black'>
            {loading ? (
                <div>
                    <div className='loading loading-ring' />
                </div>
            ) : (user ? (<div className='flex flex-col space-y-4 items-center'>
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
                        {loadingPic ? (
                            <div className="skeleton w-full h-full object-cover "></div>
                        ) : (
                            <img
                                src={user.file ? user.file : '/nopro.png'}
                                alt='profile'
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                className='rounded-full'
                            />
                        )}
                    </div>
                </div>
                <div className='relative bottom-10 '>
                    <div className='font-semibold text-center '>{user?.names}</div>
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
            ) : (<div className='flex flex-col space-y-4 items-center'>
            </div>))}
        </div>
    )
}
