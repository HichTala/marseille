'use server'

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export async function deleteProp({
                                  mission
                              }: {
    mission: any | null
}) {
    const supabase = createServerComponentClient({cookies})
    await supabase
        .from("missions")
        .update({ status: 3 })
        .eq("id", mission.id)


    await supabase
        .from("offres")
        .update({ user_id: null })
        .eq("id", mission.offres['id'])
}