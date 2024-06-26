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

    const {data: url_siren_siret} = supabase.storage.from("documents")
        .getPublicUrl(piscine?.at(0).file_siren_siret)
    const {data: url_insurance} = supabase.storage.from("documents")
        .getPublicUrl(piscine?.at(0).file_insurance)
    const {data: url_pro_card} = supabase.storage.from("documents")
        .getPublicUrl(piscine?.at(0).file_pro_card)

    return (
        <div className="w-full">
            <div className="w-full pt-2">
                <NavbarPiscine corresponding_page="profile"/>
            </div>
            <ProfilePiscine
                piscine={piscine}
                user={user}
                url_siren_siret={url_siren_siret.publicUrl}
                url_insurance={url_insurance.publicUrl}
                url_pro_card={url_pro_card.publicUrl}
            />
        </div>
    )
}
