'use server'

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Mission} from "@/app/lib/definition";

export async function getMissions({offer_id}: { offer_id: string }): Promise<Mission[]> {

    const supabase = createServerComponentClient({cookies})
    const {data: missions} = await supabase
        .from("missions")
        .select(`*, offres(*, piscine(*)), vacataire(*)`)
        .eq('offer_id', offer_id)

    return missions ? missions : []
}

export async function getMissionCount({offer_id}: { offer_id: string }): Promise<number> {

    const supabase = createServerComponentClient({cookies})
    const {data: missions, count} = await supabase
        .from("missions")
        .select('offer_id', {count: 'exact'})
        .eq('offer_id', offer_id)

    return count ? count : 0
}

interface PaiementRecap {
    [key: string]: PiscineRecap;
}

interface PiscineRecap {
    [key: string]: number
}

export async function getMissionsPaiements() {
    const supabase = createServerComponentClient({cookies})
    const {data: {user},} = await supabase.auth.getUser()

    const {data: missions} = await supabase
        .from("missions")
        .select(`*, offres(*, piscine(*)), vacataire(*)`)
        .eq('user_id', user?.id)
        .eq('status', 4)

    let paiements_recap: PaiementRecap = {}

    missions?.map((mission: Mission) => {
        if (mission.offres?.piscine){
            if (mission.offres?.piscine?.group) {
                if (paiements_recap[mission.offres?.piscine?.group] !== undefined) {
                    if (paiements_recap[mission.offres?.piscine?.group][mission.offres?.piscine?.name] !== undefined) {
                        paiements_recap[mission.offres?.piscine?.group][mission.offres?.piscine?.name] = paiements_recap[mission.offres?.piscine?.group][mission.offres?.piscine?.name] + mission.price
                    } else {
                        let piscine_recap: PiscineRecap = {}
                        piscine_recap[mission.offres?.piscine?.name] = mission.price
                        paiements_recap[mission.offres?.piscine?.group] = piscine_recap
                    }
                } else {
                    let piscine_recap: PiscineRecap = {}
                    piscine_recap[mission.offres?.piscine?.name] = mission.price
                    paiements_recap[mission.offres?.piscine?.group] = piscine_recap
                }
            } else {
                if (paiements_recap[mission.offres?.piscine?.name] !== undefined) {
                    paiements_recap[mission.offres?.piscine?.name][mission.offres?.piscine?.name] = paiements_recap[mission.offres?.piscine?.name][mission.offres?.piscine?.name] + mission.price
                } else {
                    let piscine_recap: PiscineRecap = {}
                    piscine_recap[mission.offres?.piscine?.name] = mission.price
                    paiements_recap[mission.offres?.piscine?.name] = piscine_recap
                }
            }
        }
    })

    return paiements_recap
}