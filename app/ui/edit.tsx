'use server'

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export async function deleteProp({
                                  mission
                              }: {
    mission: any | null
}) {
    console.log(mission.offres['id'])

    const supabase = createServerComponentClient({cookies})
    const { error:missions } = await supabase
        .from("missions")
        .update({ status: 3 })
        .eq("id", mission.id)


    const { error:offers } = await supabase
        .from("offres")
        .update({ user_id: null })
        .eq("id", mission.offres['id'])
}