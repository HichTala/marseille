import {NavbarPiscine} from "@/app/ui/navbar";
import Calendar from "@/app/ui/calendar";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export default async function Page(){

    const supabase = createServerComponentClient({cookies})
    const {data:offers} = await supabase
        .from("offres")
        .select(`*, vacataire(*)    `)

    return (
        <div className="w-full pt-2">
            <NavbarPiscine corresponding_page="planning"/>

            <div className="p-12">
                <Calendar offers={offers}/>
            </div>
        </div>
    )
}