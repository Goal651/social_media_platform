'use client'

import React from "react"
import DashProfile from "@/app/components/profile/DashProf"
import Updates from "@/app/components/main/Updates"
import Notifications from "@/app/components/notifications/Notifications"


export default function Dashboard() {


    return (
        <div className="flex gap-4 h-full overflow-hidden p-4">

            <DashProfile />
            <Updates />
            <Notifications />
        </div >
    )

}