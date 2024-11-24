'use client'

import React from "react"
import Stories from "@/app/components/Stories"
import DashProfile from "@/app/components/DashProfile"


export default function Dashboard() {

    return (
        <div className="grid grid-cols-4 grid-flow-row gap-4">
            <div>
                <DashProfile />
            </div>
            <div
                className="col-span-2"
            >
                <Stories />
            </div>
            <div></div>
        </div>
    )

}