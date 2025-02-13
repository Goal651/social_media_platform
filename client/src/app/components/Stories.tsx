import React, { useState } from 'react'
import MultiUserStoryViewer from './MultiUserStoryViewer'
import Link from 'next/link'
import Image from 'next/image'

interface Story {
    _id: string
    creator: {
        names: string
        _id: string
    }
    content: string
    files: string[]
}

interface UserStories {
    userId: string
    userName: string
    userProfilePic: string
    stories: Story[]
}

const Stories = () => {
    const [isStoryViewerOpen, setIsStoryViewerOpen] = useState(false)
    const [selectedUserIndex, setSelectedUserIndex] = useState(0)

    // Example data for user stories
    const allUserStories: UserStories[] = [
        {
            userId: 'user1',
            userName: 'Alice',
            userProfilePic: '/user.png',
            stories: [
                {
                    _id: 'story1',
                    creator: { names: 'Alice', _id: 'user1' },
                    content: 'Alice Story 1',
                    files: ['/userPro.png'],
                },
                {
                    _id: 'story2',
                    creator: { names: 'Alice', _id: 'user1' },
                    content: 'Alice Story 2',
                    files: ['/user.png'],
                },
            ],
        },
        {
            userId: 'user2',
            userName: 'Bob',
            userProfilePic: '/userPro.png',
            stories: [
                {
                    _id: 'story3',
                    creator: { names: 'Bob', _id: 'user2' },
                    content: 'Bob Story 1',
                    files: ['/userPro.png'],
                },
            ],
        },
        {
            userId: 'user3',
            userName: 'Charlie',
            userProfilePic: '/contact.png',
            stories: [
                {
                    _id: 'story4',
                    creator: { names: 'Charlie', _id: 'user3' },
                    content: 'Charlie Story 1',
                    files: ['/user.png'],
                },
                {
                    _id: 'story5',
                    creator: { names: 'Charlie', _id: 'user3' },
                    content: 'Charlie Story 2',
                    files: ['/userPro.png'],
                },
            ],
        },
    ]

    const openStoryViewer = (userIndex: number) => {
        setSelectedUserIndex(userIndex)
        setIsStoryViewerOpen(true)

    }

    const closeStoryViewer = () => {
        setIsStoryViewerOpen(false)
        console.log(selectedUserIndex)
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Stories</h2>
            <div className="flex gap-4">
                <Link href={'/createStory'} className="carousel-item flex-col">
                    <div className="indicator">
                        <span className="w-5 h-5 badge indicator-item indicator-bottom bg-purple-700 text-white text-xl rounded-none p-0 bottom-2 right-2">
                            +
                        </span>
                        <div className="grid h-[70px] w-[70px] place-items-center">
                            <div className="rounded-full bg-slate-200 p-5">
                                <Image
                                    src="/no_profile.svg"
                                    alt="Add Story"
                                    className="rounded-full"
                                    objectFit="cover"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </div>
                    </div>
                    <div>Add Story</div>
                </Link>
                {allUserStories.map((user, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center cursor-pointer "
                        onClick={() => openStoryViewer(index)}
                    >
                        <div className=''>
                            <div className='w-16 h-16 relative bg-gradient-to-t from-purple-100 to-purple-400 rounded-full'>
                                <Image
                                    alt='profile'
                                    src={user.userProfilePic}
                                    layout='fill'
                                    className='rounded-full w-full h-full '
                                />
                            </div>
                        </div>
                        <div className="text-sm mt-2 text-black">
                            {user.userName}
                        </div>
                    </div>
                ))}
            </div>

            {/* Story Viewer Modal */}
            {isStoryViewerOpen && (
                <MultiUserStoryViewer
                    allUserStories={allUserStories}
                    onClose={closeStoryViewer}
                />
            )}
        </div>
    )
}

export default Stories
