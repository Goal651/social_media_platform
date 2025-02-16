'use client';

import Image from "next/image";
import React from "react";

interface ActivityItem {
    profileImage: string;
    username: string;
    action: string;
    timeAgo: string;
    previewImage?: string; // Optional for actions with a preview image
}

const activities: ActivityItem[] = [
    {
        profileImage: "/user.png",
        username: "K_Anitta❤️😍",
        action: "started following you",
        timeAgo: "5m ago",
    },
    {
        profileImage: "/user.png",
        username: "Karabo_Angee",
        action: "liked your post",
        timeAgo: "20m ago",
        previewImage: "/images/post1.jpg",
    },
    {
        profileImage: "/user.png",
        username: "Brian Madison",
        action: "mentions you in their story",
        timeAgo: "13m ago",
    },
    {
        profileImage: "/userPro.png",
        username: "yahhhhlah",
        action: "commented on your story",
        timeAgo: "45m ago",
        previewImage: "/images/post2.jpg",
    },
];

const ActivityCard: React.FC = () => {
    return (
        <div className="max-w-md p-8  rounded-2xl shadow-md bg-purple-100 text-black">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Activity</h2>
                <a href="#" className="text-sm text-primary hover:underline">
                    see all
                </a>
            </div>

            {/* Activities */}
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4">
                        {/* Profile Image */}
                        <Image
                            height={500}
                            width={500}
                            src={activity.profileImage}
                            alt={activity.username}
                            className="w-10 h-10 rounded-full object-cover"
                        />

                        {/* Activity Details */}
                        <div className="flex-1">
                            <p className="text-sm">
                                <span className="font-bold">{activity.username}</span>{" "}
                                {activity.action}{" "}
                                <span className="text-gray-500">{activity.timeAgo}</span>
                            </p>
                        </div>

                        {/* Preview Image (Optional) */}
                        {activity.previewImage && (
                            <Image
                                height={500}
                                width={500}
                                src={'/userPro.png'}
                                alt="Preview"
                                className="w-12 h-12 rounded-md object-cover"
                            />
                        )}
                    </div>
                ))}

                {/* Divider */}
                <p className="text-sm text-gray-500 pt-2">yesterday</p>

                {/* Example for Yesterday's Activities */}
                <div className="space-y-4">
                    {activities.slice(0, 3).map((activity, index) => (
                        <div key={index} className="flex items-start space-x-4">
                            <Image
                                height={500}
                                width={500}
                                src={activity.profileImage}
                                alt={activity.username}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <p className="text-sm">
                                    <span className="font-bold">{activity.username}</span>{" "}
                                    {activity.action}{" "}
                                    <span className="text-gray-500">{activity.timeAgo}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
