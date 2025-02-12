import { useState, useEffect } from 'react';

interface Story {
    _id: string;
    creator: {
        names: string;
        _id: string;
    };
    content: string;
    files: string[];
}

interface UserStories {
    userId: string;
    userName: string;
    userProfilePic: string;
    stories: Story[];
}

interface StoryViewerProps {
    allUserStories: UserStories[];
    onClose: () => void;
}

const MultiUserStoryViewer = ({ allUserStories, onClose }: StoryViewerProps) => {
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    const currentUser = allUserStories[currentUserIndex];
    const currentStory = currentUser.stories[currentStoryIndex];

    const handleNextStory = () => {
        if (currentStoryIndex < currentUser.stories.length - 1) {
            setCurrentStoryIndex(currentStoryIndex + 1);
        } else {
            handleNextUser();
        }
    };

    const handlePrevStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(currentStoryIndex - 1);
        } else if (currentUserIndex > 0) {
            handlePrevUser();
        }
    };

    const handleNextUser = () => {
        if (currentUserIndex < allUserStories.length - 1) {
            setCurrentUserIndex(currentUserIndex + 1);
            setCurrentStoryIndex(0);
        } else {
            onClose(); // Close viewer if no more users
        }
    };

    const handlePrevUser = () => {
        if (currentUserIndex > 0) {
            setCurrentUserIndex(currentUserIndex - 1);
            setCurrentStoryIndex(allUserStories[currentUserIndex - 1].stories.length - 1);
        }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowRight':
                handleNextStory();
                break;
            case 'ArrowLeft':
                handlePrevStory();
                break;
            case 'Escape':
                onClose();
                break;
        }
    };

    // Attach keyboard event listeners
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentStoryIndex, currentUserIndex]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col z-50">
            {/* User Info */}
            <div className="flex items-center justify-between p-4 text-white">
                <div className="flex items-center gap-2">
                    <img
                        src={currentUser.userProfilePic}
                        alt={currentUser.userName}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h3 className="font-bold">{currentUser.userName}</h3>
                    </div>
                </div>
                <button onClick={onClose} className="text-xl font-bold">
                    ✕
                </button>
            </div>

            {/* Story Content */}
            <div className="flex-grow flex items-center justify-center">
                {currentStory.files[0].endsWith('.mp4') ? (
                    <video
                        src={currentStory.files[0]}
                        className="max-h-full max-w-full"
                        controls
                        autoPlay
                    />
                ) : (
                    <img
                        src={currentStory.files[0]}
                        alt={currentStory.content}
                        className="max-h-full max-w-full object-contain"
                    />
                )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-4 text-white">
                <button
                    onClick={handlePrevStory}
                    className={`text-xl ${currentUserIndex === 0 && currentStoryIndex === 0 ? 'opacity-50' : ''}`}
                    disabled={currentUserIndex === 0 && currentStoryIndex === 0}
                >
                    ◀
                </button>
                <div className="flex items-center gap-2">
                    {currentUser.stories.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 rounded-full ${
                                index === currentStoryIndex ? 'bg-white' : 'bg-gray-500'
                            }`}
                        />
                    ))}
                </div>
                <button
                    onClick={handleNextStory}
                    className={`text-xl ${
                        currentUserIndex === allUserStories.length - 1 &&
                        currentStoryIndex === currentUser.stories.length - 1
                            ? 'opacity-50'
                            : ''
                    }`}
                    disabled={
                        currentUserIndex === allUserStories.length - 1 &&
                        currentStoryIndex === currentUser.stories.length - 1
                    }
                >
                    ▶
                </button>
            </div>

            {/* Carousel for Other Users */}
            <div className="flex gap-2 p-4 overflow-x-auto bg-black bg-opacity-70">
                {allUserStories.map((user, index) => (
                    <div
                        key={user.userId}
                        className={`flex flex-col items-center ${
                            index === currentUserIndex ? 'opacity-100' : 'opacity-50'
                        }`}
                        onClick={() => {
                            setCurrentUserIndex(index);
                            setCurrentStoryIndex(0);
                        }}
                    >
                        <img
                            src={user.userProfilePic}
                            alt={user.userName}
                            className="w-12 h-12 rounded-full"
                        />
                        <p className="text-xs text-white mt-1">{user.userName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiUserStoryViewer;
