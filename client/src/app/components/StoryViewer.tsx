import { useState, useEffect } from 'react';

interface Story {
    _id: string;
    creator: { _id: string; names: string; profilePic: string };
    content: string;
    files: string[];
    createdAt: string;
}

interface StoryViewerProps {
    stories: Story[];
    onClose: () => void;
}

const StoryViewer = ({ stories, onClose }: StoryViewerProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const currentStory = stories[currentIndex];

    const handleNext = () => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onClose(); // Close viewer if it's the last story
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    useEffect(() => {
        const timer = setTimeout(handleNext, 5000); // Auto-progress after 5 seconds
        return () => clearTimeout(timer); // Clear timer on unmount
    }, [currentIndex]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 text-white">
                <div className="flex items-center gap-2">
                    <img
                        src={currentStory.creator.profilePic}
                        alt={currentStory.creator.names}
                        className="w-10 h-10 rounded-full"
                    />
                    <div>
                        <h3 className="font-bold">{currentStory.creator.names}</h3>
                        <p className="text-xs">{new Date(currentStory.createdAt).toLocaleTimeString()}</p>
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

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between p-4 text-white">
                <button onClick={handlePrev} className="text-xl">
                    ◀
                </button>
                <input
                    type="text"
                    placeholder="Reply..."
                    className="flex-grow mx-4 p-2 rounded-lg bg-white text-black"
                />
                <button onClick={handleNext} className="text-xl">
                    ▶
                </button>
            </div>
        </div>
    );
};

export default StoryViewer;
