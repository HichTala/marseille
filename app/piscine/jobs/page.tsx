import {NavbarPiscine} from "@/app/ui/navbar";
import Calendar from "@/app/ui/calendar";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/react";

export default async function Page(){

    const supabase = createServerComponentClient({cookies})
    const {data:offers} = await supabase
        .from("offres")
        .select(`*, vacataire(*)`)

    return (
        <div className="w-full pt-2">
            <NavbarPiscine corresponding_page="planning"/>

            <Button
                className="mt-3 ml-8"
                href="/piscine/post"
                as={Link}
                color="primary"
            >
                Poster
            </Button>

            <div className="px-8 pb-12 pt-8">
                <Calendar offers={offers} vacataire={false}/>
            </div>
        </div>
    )
}