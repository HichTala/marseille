'use server'

import {Navbar, NavbarPiscine} from "@/app/ui/navbar";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {ProfilePiscine} from "@/app/ui/profile";

export default async function Page(){

    const supabase = createServerComponentClient({cookies})
    const {data: { user }} = await supabase.auth.getUser()
    const {data: piscine} = await supabase.from("piscine")
        .select()
        .eq("id", user?.id)

    return (
        <div className="w-full">
            <div className="w-full pt-2">
                <NavbarPiscine corresponding_page="profile"/>
            </div>
            <ProfilePiscine piscine={piscine} user={user}/>
        </div>
    )
}
