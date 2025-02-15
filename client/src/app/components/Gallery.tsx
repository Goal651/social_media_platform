'use client'

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"

interface GalleryProps {
    photos: string[]
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null)

    // Close the modal
    const closeModal = () => {
        setSelectedPhotoIndex(null)
    }

    // Navigate to the previous photo
    const showPreviousPhoto = useCallback(() => {
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((prevIndex) =>
                prevIndex === 0 ? photos.length - 1 : (prevIndex as number) - 1
            )
        }
    },[photos.length, selectedPhotoIndex])

    // Navigate to the next photo
    const showNextPhoto = useCallback(() => {
        if (selectedPhotoIndex !== null) {
            setSelectedPhotoIndex((prevIndex) =>
                prevIndex === photos.length - 1 ? 0 : (prevIndex as number) + 1
            )
        }
    },[photos.length, selectedPhotoIndex])

    // Keyboard navigation
    useEffect(() => {

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
    }, [selectedPhotoIndex, showNextPhoto, showPreviousPhoto])

    const photoRender = () => {
        const size = photos.length
        if (!photos) return
        if (size <= 0) return
        switch (size) {
            case 1:
                return (<div className="flex items-center justify-center">
                    <div
                        className="relative cursor-pointer w-80 h-96 "
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
                </div>
                )

            case 2:
                return (
                    <div className="flex justify-center gap-x-2">
                        {photos.map((photo, index) => (
                            <div
                                key={index}
                                className="relative cursor-pointer w-80 h-96"
                                onClick={() => setSelectedPhotoIndex && setSelectedPhotoIndex(index)}
                            >
                                <Image
                                    src={photo}
                                    alt=""
                                    width={1000}
                                    height={100}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                )

            case 3:
                return (
                    <div className="flex justify-center gap-x-2">
                        {photos.map((photo, index) => (
                            <div
                                key={index}
                                className="relative cursor-pointer w-80 h-96"
                                onClick={() => setSelectedPhotoIndex && setSelectedPhotoIndex(0)}
                            >
                                <Image
                                    src={photo}
                                    alt=""
                                    width={1000}
                                    height={100}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        ))}
                    </div>
                )

            case 4:
                return (
                    <div className="flex justify-center gap-x-2 items-center">
                        <div>
                            <div
                                className="relative cursor-pointer w-80 h-96"
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
                        </div>
                        <div className="flex flex-col gap-y-2">

                            {photos.slice(1, 3).map((photo, index) => (
                                <div
                                    key={index}
                                    className="relative cursor-pointer w-80 h-48"
                                    onClick={() => setSelectedPhotoIndex && setSelectedPhotoIndex(index)}
                                >
                                    <Image
                                        src={photo}
                                        alt=""
                                        width={1000}
                                        height={100}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <div
                                className="relative cursor-pointer w-80 h-96"
                                onClick={() => setSelectedPhotoIndex && setSelectedPhotoIndex(0)}
                            >
                                <Image
                                    src={photos[3]}
                                    alt=""
                                    width={1000}
                                    height={100}
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                )

            case 5:
                return (
                    <div className="flex gap-x-2 justify-center">
                        <div>
                            <div
                                className="relative cursor-pointer w-80 h-96"
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
                        </div>
                        <div className="flex gap-x-2 justify-center">
                            <div className="flex flex-col gap-y-2">
                                {photos.slice(1, 3).map((photo, index) => (
                                    <div
                                        key={index}
                                        className="relative cursor-pointer w-80 h-48"
                                        onClick={() => setSelectedPhotoIndex && setSelectedPhotoIndex(index)}
                                    >
                                        <Image
                                            src={photo}
                                            alt=""
                                            width={1000}
                                            height={100}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                {photos.slice(3, 5).map((photo, index) => (
                                    <div
                                        key={index}
                                        className="relative cursor-pointer w-80 h-48"
                                        onClick={() => setSelectedPhotoIndex && setSelectedPhotoIndex(index)}
                                    >
                                        <Image
                                            src={photo}
                                            alt=""
                                            width={1000}
                                            height={100}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )

            default:
                return (
                    <div className="flex gap-x-2 justify-center">
                        <div>
                            <div
                                className="relative cursor-pointer w-80 h-96"
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
                        </div>
                        <div className="flex gap-x-2">
                            <div className="flex flex-col gap-y-2">
                                {photos.slice(1, 3).map((photo, index) => (
                                    <div
                                        key={index}
                                        className="relative cursor-pointer w-80 h-48"
                                        onClick={() => setSelectedPhotoIndex && setSelectedPhotoIndex(index)}
                                    >
                                        <Image
                                            src={photo}
                                            alt=""
                                            width={1000}
                                            height={100}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <div
                                    className="relative cursor-pointer w-80 h-48"
                                    onClick={() => setSelectedPhotoIndex && setSelectedPhotoIndex(0)}
                                >
                                    <Image
                                        src={photos[4]}
                                        alt=""
                                        width={1000}
                                        height={100}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div
                                    className="relative cursor-pointer w-80 h-48"
                                    onClick={() => setSelectedPhotoIndex && setSelectedPhotoIndex(0)}
                                >
                                    <Image
                                        src={photos[5]}
                                        alt=""
                                        width={1000}
                                        height={100}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                    <div className="absolute rounded-lg w-full h-full top-0  z-20 flex items-center justify-center bg-black opacity-50 text-white text-lg">
                                        +{size - 5}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )


        }
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            {/* Photo Grid */}
            <div >
                {photoRender()}
            </div>

            {/* Modal for Photo Preview */}
            {selectedPhotoIndex !== null && (
                <div
                    className="fixed  inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50"
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
                            <Image
                                height={1000}
                                width={300}
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
                                <Image
                                    key={index}
                                    src={photo}
                                    height={500}
                                    width={500}
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
