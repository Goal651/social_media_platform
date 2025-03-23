import ActivityCard from "@/app/components/notifications/ActivityCard";
import SuggestionCard from "@/app/components/notifications/SuggestionCard";

export default function Notifications() {

    return (
        <div className="h-screen w-1/5 overflow-auto flex flex-col gap-y-10 scroll-smooth hide-scrollbar">
            <ActivityCard />
            <SuggestionCard />
        </div>
    )
}