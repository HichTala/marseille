'use server'

import {Navbar} from "@/app/ui/navbar";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Profile} from "@/app/ui/profile";

export default async function Page(){

    const supabase = createServerComponentClient({cookies})
    const {data: { user }} = await supabase.auth.getUser()
    const {data: vacataire} = await supabase.from("vacataire")
        .select()
        .eq("id", user?.id)

    return (
        <div className="w-full">
            <div className="w-full pt-2">
                <Navbar corresponding_page="profile"/>
            </div>
            <Profile vacataire={vacataire} user={user}/>
        </div>
    )
}
