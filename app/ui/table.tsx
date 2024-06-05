'use server'

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {PiscineDisplay, PropositionDisplay, VacationDisplay} from "@/app/ui/display";
import {redirect} from "next/navigation";
import React from "react";
import {ChipContainer} from "@/app/ui/chip";

export default async function Table({
                                        piscine,
                                        certificate,
                                        date
                                    }: {
    piscine: string;
    certificate: string;
    date?: Date | null;
}) {
    const supabase = createServerComponentClient({cookies})

    const dateFilter: { date: Date } | {} = date !== null ? {date} : {};

    const {data: offers} = await supabase
        .from("offres")
        .select(`*, piscine (*)`)
        .or("name.ilike.%" + piscine + "%" + ",city.ilike.%" + piscine + "%" + ",address.ilike.%" + piscine + "%", {referencedTable: 'piscine'})
        .not('piscine', 'is', null)
        .ilike("certificate", '%' + certificate + '%')
        .match(dateFilter)

    return (
        <div className="mt-6 flow-root">
            <ChipContainer piscine={piscine} certificate={certificate} date={date} />
            <div className="grid min-w-full justify-between grid-cols-1 md:grid-cols-3 gap-8">
                {offers?.map((offer) => (
                    <PiscineDisplay offer={offer}/>
                ))}
            </div>
        </div>
    );
}


export async function PropositionsTable({
                                            piscine,
                                            date
                                        }: {
    piscine: string;
    date?: Date | null;
}) {
    const supabase = createServerComponentClient({cookies})

    const dateFilter: { date: Date } | {} = date !== null ? {date} : {};

    const {data: {user}} = await supabase.auth.getUser()
    const {data: missions} = await supabase
        .from("missions")
        .select(`id, status, price, offres(*, piscine(*))`)
        .eq('user_id', user?.id)
        .or("name.ilike.%" + piscine + "%" + ",city.ilike.%" + piscine + "%" + ",address.ilike.%" + piscine + "%", {referencedTable: 'offres.piscine'})
        .not('offres.piscine', 'is', null)
        .not('offres', 'is', null)
        .match(dateFilter)

    console.log(missions)

    return (
        <div className="mt-6 flow-root w-full">
            <div className="grid justify-items-center grid-cols-1 gap-4">
                {missions?.map((mission) => (
                    <PropositionDisplay mission={mission}/>
                ))}
            </div>
        </div>
    );
}


export async function VacationTable() {
    const supabase = createServerComponentClient({cookies})

    // const dateFilter: { date: Date } | {} = date !== null ? {date} : {};

    const {data: missions} = await supabase
        .from("missions")
        .select(`status, price, offres(*), vacataire(*)`)
        .eq('status', 0)
    // .or("name.ilike.%" + piscine + "%" + ",city.ilike.%" + piscine + "%" + ",address.ilike.%" + piscine + "%")
    // .match(dateFilter)

    // console.log(missions)

    return (
        <div className="mt-6 flow-root w-full">
            <div className="grid justify-items-center grid-cols-1 gap-4">
                {missions?.map((mission) => (
                    <VacationDisplay mission={mission}/>
                ))}
            </div>
        </div>
    );
}


export async function AcceptVacataire(offers_id: String, user_id: String) {
    const supabase = createServerComponentClient({cookies})
    const {error:offer} = await supabase
        .from("offres")
        .update({'user_id': user_id})
        .eq('id', offers_id)

    // stats = ["en attente", "accepte", "liste d'attente", "termine", "annulé", "refusée"]

    const {error: user_mission} = await supabase
        .from("missions")
        .update({status: 1})
        .eq('user_id', user_id)
        .eq('offer_id', offers_id)

    const {error: mission} = await supabase
        .from("missions")
        .update({status: 2})
        .neq('user_id', user_id)
        .eq('offer_id', offers_id)

    console.log(offer)
    console.log(user_mission)
    console.log(mission)

    redirect('/piscine/validation')

}
