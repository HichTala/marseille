'use server'

import {Navbar} from "@/app/ui/navbar";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Profile} from "@/app/ui/profile";

export default async function Page() {

    const supabase = createServerComponentClient({cookies})
    const {data: {user}} = await supabase.auth.getUser()
    const {data: vacataire} = await supabase.from("vacataire")
        .select()
        .eq("id", user?.id)


    const {data: url_siren_siret} = supabase.storage.from("documents")
        .getPublicUrl(vacataire?.at(0).file_siren_siret)
    const {data: url_certificate} = supabase.storage.from("documents")
        .getPublicUrl(vacataire?.at(0).file_certificate)
    const {data: url_pse} = supabase.storage.from("documents")
        .getPublicUrl(vacataire?.at(0).file_pse)
    const {data: url_insurance} = supabase.storage.from("documents")
        .getPublicUrl(vacataire?.at(0).file_insurance)
    const {data: url_pro_card} = supabase.storage.from("documents")
        .getPublicUrl(vacataire?.at(0).file_pro_card)

    return (
        <div className="w-full">
            <div className="w-full pt-2">
                <Navbar corresponding_page="profile"/>
            </div>
            <Profile
                vacataire={vacataire}
                user={user}
                url_siren_siret={url_siren_siret.publicUrl}
                url_certificate={url_certificate.publicUrl}
                url_pse={url_pse.publicUrl}
                url_insurance={url_insurance.publicUrl}
                url_pro_card={url_pro_card.publicUrl}
            />
        </div>
    )
}
