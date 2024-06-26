import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Navbar, NavbarPiscine} from "@/app/ui/navbar";
import {DetailsFacturationPiscine} from "@/app/ui/paiements";

export default async function Page() {

    const supabase = createServerComponentClient({cookies})

    return (
        <div className="w-full pt-2">
            <NavbarPiscine corresponding_page="paiements"/>
            <div className="w-full p-8 z-auto grid justify-items-center">
                <h1 className="text-5xl font-black md:font-extrabold font-sans text-cente">Paiements</h1>
                <DetailsFacturationPiscine/>
            </div>

        </div>
    )
}