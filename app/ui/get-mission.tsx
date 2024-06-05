'use server'

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Mission} from "@/app/lib/definition";

export async function getMission({offer_id}:{offer_id: string}): Promise<Mission> {

    const supabase = createServerComponentClient({cookies})
    const {data: missions} = await supabase
        .from("missions")
        .select(`*, offres(*, piscine(*))`)
        .eq('offer_id', offer_id)

    return missions?.at(0)
}