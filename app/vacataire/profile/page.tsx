'use server'

import {Navbar} from "@/app/ui/navbar";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Input} from "@nextui-org/react";
import {MailIcon} from "@nextui-org/shared-icons";
import {Button} from "@nextui-org/button";
import {redirect} from "next/navigation";
import {Profile} from "@/app/ui/profile";
import {createClient} from "@/utils/supabase/server";

export default async function Page(){

    const supabase = createServerComponentClient({cookies})
    const {data: { user }} = await supabase.auth.getUser()
    const {data: vacataire} = await supabase.from("vacataire")
        .select()
        .eq("id", user?.id)
    console.log(vacataire)

    return (
        <div className="w-full">
            <div className="w-full pt-2">
                <Navbar corresponding_page="profile"/>
            </div>
            <Profile vacataire={vacataire} user={user}/>
        </div>
    )
}


export async function signout() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error(error)
    }
    console.log(error)
    redirect('/')
}