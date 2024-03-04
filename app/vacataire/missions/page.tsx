import MissionsWrapper from "@/app/ui/missions";
import Calendar from "@/app/ui/calendar";

export default async function Page(){
    return (
        <div className="w-full p-12">
            <div className="flex w-full items-center justify-between mb-5">
                <h1 className="text-2xl">Prochaines Missions</h1>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <MissionsWrapper/>
            </div>

            <div className="flex w-full items-center justify-between mb-5 mt-5">
                <h1 className="text-2xl">Calendriers</h1>
            </div>
            <Calendar/>
        </div>
    )
}