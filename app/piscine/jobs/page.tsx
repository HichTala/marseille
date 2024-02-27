import MissionsWrapper from "@/app/ui/missions/missions";
import Calendar from "@/app/ui/missions/calendar";
import Search, {DatePicker, List, Place} from "@/app/ui/search";

export default async function Page(){
    return (
        <div className="w-full p-12">
            <div className="flex w-full items-center justify-between mb-5">
                <h1 className="text-2xl">Poster une mission</h1>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Place placeholder="Site"/>
                <List placeholder="Diplômes" list="fonction"/>
                <DatePicker/>
                <Search placeholder="Description"/>
            </div>
            <div className="w-full flex justify-center">
                <button className="p-12">Poster</button>
            </div>


            <div className="flex w-full items-center justify-between mb-5 mt-5">
                <h1 className="text-2xl">Calendriers</h1>
            </div>
            <Calendar/>
        </div>
    )
}