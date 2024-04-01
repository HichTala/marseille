import {notFound} from "next/navigation";
import {Details} from "@/app/ui/details";
import {Navbar} from "@/app/ui/navbar";

export default async function Page({params}: { params: { id: string } }) {
    const id = params.id

    return (
        <div className="w-full pt-2 items-center">
            <Navbar corresponding_page="offres"/>
            <div className="flex justify-center align-middle p-8 w-full">
                <Details offer_id={id}/>
            </div>
        </div>
    );
}