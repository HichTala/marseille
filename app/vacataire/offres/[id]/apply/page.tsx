import {notFound} from "next/navigation";
import {Details} from "@/app/ui/details";

export default async function Page({params}: { params: { id: string } }) {
    const id = params.id

    return (
        <main>
            <Details offer_id={id}/>
        </main>
    );
}