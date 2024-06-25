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


    const {data: offers} = await supabase
        .from("offres")
        .update({ user_id: null })
        .eq("id", mission.offres['id'])
        .select("user_id")

    const {data: vacataires} = await supabase
        .from('vacataire')
        .select('nb_annulations')
        .eq("id", offers?.at(0)?.user_id)

    const {error: error_vacataire} = await supabase
        .from('vacataire')
        .update({
            nb_annulations: vacataires?.at(0)?.nb_annulations + 1,
        })
        .eq("id", offers?.at(0)?.user_id)

    console.log(error_vacataire)
    if (error_vacataire) {
        return {
            message: "Erreur de base de donnée: l'offre n'a pas pu être créer"
        }
    }
}

export async function updateProp({
                                     mission, price
                                 }: {
    mission: any | null,
    price: string
}) {
    const supabase = createServerComponentClient({cookies})
    await supabase
        .from("missions")
        .update({ price: Number(price)*100 })
        .eq("id", mission.id)
}