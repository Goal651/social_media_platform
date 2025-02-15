"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  useEffect(() => router.push('/dashboard'))

  return (
    <div className="flex h-screen justify-center bg-gradient-to-r from-purple-300 to-purple-400 ">
      <div className="flex flex-col  justify-center items-center">
        <div className="font-bold text-3xl">Chat App</div>
        <span className="loading loading-bars text-3xl text-black ">Loading</span>
      </div>
    </div>
  );
}
