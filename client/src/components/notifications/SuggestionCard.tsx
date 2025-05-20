'use client';

import Image from "next/image";
import React from "react";

interface SuggestionItem {
  profileImage: string;
  username: string;
  description: string;
}

const suggestions: SuggestionItem[] = [
  {
    profileImage: "/user.png",
    username: "K_Anitta❤️😍",
    description: "followed by Adrien",
  },
  {
    profileImage: "/user.png",
    username: "Karabo_Angee",
    description: "suggested for you",
  },
  {
    profileImage: "/user.png",
    username: "Brian Madison",
    description: "followed by kinghim",
  },
  {
    profileImage: "/user.png",
    username: "yahhhhlah",
    description: "suggested for you",
  },
  {
    profileImage: "/user.png",
    username: "_n😇😎😄",
    description: "followed by chance",
  },
  {
    profileImage: "/user.png",
    username: "Kelen",
    description: "followed by helena",
  },
];

const SuggestionsCard: React.FC = () => {
  return (
    <div className="max-w-md p-8  rounded-2xl shadow-md bg-purple-100 text-black ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Suggestions for you</h2>
      </div>

      {/* Suggestions */}
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-center justify-between">
            {/* Profile Section */}
            <div className="flex items-center space-x-3">
              <Image
                width={500}
                height={500}
                src={suggestion.profileImage}
                alt={suggestion.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold">{suggestion.username}</p>
                <p className="text-sm text-gray-500">{suggestion.description}</p>
              </div>
            </div>

            {/* Follow Button */}
            <button className="btn btn-sm bg-indigo-700 border-0  hover:bg-indigo-800 text-white text-sm capitalize">Follow</button>
          </div>
        ))}
      </div>

      {/* View All */}
      <div className="mt-4 text-center">
        <a href="#" className="text-primary hover:underline">
          View all
        </a>
      </div>
    </div>
  );
};

export default SuggestionsCard;
