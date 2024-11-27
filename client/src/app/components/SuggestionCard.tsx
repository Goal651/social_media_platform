/* eslint-disable @next/next/no-img-element */
'use client';

import React from "react";

interface SuggestionItem {
  profileImage: string;
  username: string;
  description: string;
}

const suggestions: SuggestionItem[] = [
  {
    profileImage: "/images/profile1.jpg",
    username: "K_Anitta❤️😍",
    description: "followed by Adrien",
  },
  {
    profileImage: "/images/profile2.jpg",
    username: "Karabo_Angee",
    description: "suggested for you",
  },
  {
    profileImage: "/images/profile3.jpg",
    username: "Brian Madison",
    description: "followed by kinghim",
  },
  {
    profileImage: "/images/profile4.jpg",
    username: "yahhhhlah",
    description: "suggested for you",
  },
  {
    profileImage: "/images/profile5.jpg",
    username: "_n😇😎😄",
    description: "followed by chance",
  },
  {
    profileImage: "/images/profile6.jpg",
    username: "Kelen",
    description: "followed by helena",
  },
];

const SuggestionsCard: React.FC = () => {
  return (
    <div className="max-w-md p-4 bg-base-100 rounded-lg shadow-md border border-base-300">
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
              <img
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
            <button className="btn btn-sm btn-primary text-sm capitalize">Follow</button>
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
