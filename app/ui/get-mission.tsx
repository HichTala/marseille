'use server'

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Mission} from "@/app/lib/definition";

export async function getMissions({offer_id}:{offer_id: string}): Promise<Mission[]> {

    const supabase = createServerComponentClient({cookies})
    const {data: missions} = await supabase
        .from("missions")
        .select(`*, offres(*, piscine(*)), vacataire(*)`)
        .eq('offer_id', offer_id)

    return missions ? missions : []
}

export async function getMissionCount({offer_id}:{offer_id: string}): Promise<number> {

    const supabase = createServerComponentClient({cookies})
    const {data: missions, count} = await supabase
        .from("missions")
        .select('offer_id', { count: 'exact' })
        .eq('offer_id', offer_id)

    return count ? count : 0
}