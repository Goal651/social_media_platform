'use client'

import React, { useState, useEffect } from "react"
import Image from "next/image"

interface GalleryProps {
    photos: string[]
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)
    const columns = Math.floor((photos.length / 2))+5
    const girdColumns = `grid-rows-${columns}`

    // Close the modal
    const closeModal = () => {
        setSelectedPhotoIndex(null)
    }

    // Navigate to the previous photo
    const showPreviousPhoto = () => {
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((prevIndex) =>
                prevIndex === 0 ? photos.length - 1 : (prevIndex as number) - 1
            )
        }
    }

    // Navigate to the next photo
    const showNextPhoto = () => {
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((prevIndex) =>
                prevIndex === photos.length - 1 ? 0 : (prevIndex as number) + 1
            )
        }
    }

    // Keyboard navigation
    useEffect(() => {
        console.log(girdColumns)
        const handleKeyDown = (event: KeyboardEvent) => {
            if (selectedPhotoIndex !== null) {
                if (event.key === "Escape") {
                    closeModal()
                } else if (event.key === "ArrowLeft") {
                    showPreviousPhoto()
                } else if (event.key === "ArrowRight") {
                    showNextPhoto()
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [selectedPhotoIndex])

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            {/* Photo Grid */}
            <div className={`grid ${girdColumns}  gap-4`}>
                {/* Highlighted Photo */}
                {photos.length > 0 && (
                    <div
                        className="relative cursor-pointer w-full h-56"
                        onClick={() => setSelectedPhotoIndex && setSelectedPhotoIndex(0)}
                    >
                        <Image
                            src={photos[0]}
                            alt=""
                            width={1000}
                            height={100}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                )}

                {/* Smaller Photos */}
                <div className={`grid grid-rows-2 grid-cols-3 gap-2 col-span-2`}>
                    {photos.slice(1).map((photo, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer h-28"
                            onClick={() => setSelectedPhotoIndex(index + 1)}
                        >
                            <Image
                                width={1000}
                                height={1000}
                                src={photo}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                            {/* Overlay for extra photos */}
                            {index === photos.slice(1).length - 1 && photos.length > photos.slice(1).length && (
                                <>
                                    <Image
                                        width={1000}
                                        height={1000}
                                        src={photo}
                                        alt={`Gallery Image ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute  z-20 flex items-center justify-center bg-black  text-white text-lg">
                                        +{photos.length - 5}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                {columns % 2 == 0 && (
                    <div
                        className="relative cursor-pointer w-full h-56"
                        onClick={() => setSelectedPhotoIndex && setSelectedPhotoIndex(0)}
                    >
                        <Image
                            src={photos[0]}
                            alt=""
                            width={1000}
                            height={100}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                )}
            </div>

            {/* Modal for Photo Preview */}
            {selectedPhotoIndex !== null && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-white p-4 rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
                        >
                            ✕
                        </button>
                        <div className="w-full flex-1 flex items-center justify-center overflow-hidden">
                            <img
                                src={photos[selectedPhotoIndex]}
                                alt="Preview"
                                className="max-w-full max-h-full object-contain rounded-lg"
                            />
                        </div>
                        {/* Navigation Buttons */}
                        <button
                            onClick={showPreviousPhoto}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                        >
                            ←
                        </button>
                        <button
                            onClick={showNextPhoto}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                        >
                            →
                        </button>
                        {/* Progress Indicator */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg">
                            {selectedPhotoIndex + 1} / {photos.length}
                        </div>
                        {/* Thumbnails */}
                        <div className="absolute bottom-2 flex gap-2 overflow-x-auto px-4 py-2">
                            {photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={photo}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-12 h-12 object-cover rounded-md cursor-pointer border ${index === selectedPhotoIndex ? "border-white" : "border-transparent"
                                        }`}
                                    onClick={() => setSelectedPhotoIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Gallery
