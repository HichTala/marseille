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

    let query = supabase
        .from("offres")
        .select(`*, piscine (*)`)
        .or("name.ilike.%" + piscine + "%" + ",city.ilike.%" + piscine + "%" + ",address.ilike.%" + piscine + "%", {referencedTable: 'piscine'})
        .not('piscine', 'is', null)
        .ilike("certificate", '%' + certificate + '%')

    if (date){
        let startDate = new Date(date)
        let endDate = new Date(date)
        endDate.setDate(endDate.getDate() + 1)

        query = query.gte('startDatetime', startDate?.toISOString())
        query = query.lt('startDatetime', endDate?.toISOString())
    }

    const {data: offers} = await query

    return (
        <div className="mt-6 flow-root">
            <ChipContainer piscine={piscine} certificate={certificate} date={date} states={[]}/>
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
                                            date,
                                            state
                                        }: {
    piscine: string;
    date?: Date | null;
    state: string
}) {
    const supabase = createServerComponentClient({cookies})

    const stateFilter = state != "" ? '(' + state + ')' : '(0, 1, 2, 3, 4)'

    const {data: {user}} = await supabase.auth.getUser()
    let query = supabase
        .from("missions")
        .select(`id, status, price, offres(*, piscine(*))`)
        .eq('user_id', user?.id)
        .or("name.ilike.%" + piscine + "%" + ",city.ilike.%" + piscine + "%" + ",address.ilike.%" + piscine + "%", {referencedTable: 'offres.piscine'})
        .filter("status", "in", stateFilter)
        .not('offres.piscine', 'is', null)
        .not('offres', 'is', null)

    if (date){
        let startDate = new Date(date)
        let endDate = new Date(date)
        endDate.setDate(endDate.getDate() + 1)

        query = query.gte('offres.startDatetime', startDate?.toISOString())
        query = query.lt('offres.startDatetime', endDate?.toISOString())
    }

    const {data: missions} = await query

    return (
        <div className="mt-6 flow-root w-full">
            <ChipContainer piscine={piscine} certificate={""} date={date} states={state != "" ? state.split(",").map(Number) : []}/>
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
    await supabase
        .from("offres")
        .update({'user_id': user_id})
        .eq('id', offers_id)

    // stats = ["en attente", "accepte", "liste d'attente", "termine", "annulé", "refusée"]

    await supabase
        .from("missions")
        .update({status: 1})
        .eq('user_id', user_id)
        .eq('offer_id', offers_id)

    await supabase
        .from("missions")
        .update({status: 2})
        .neq('user_id', user_id)
        .eq('offer_id', offers_id)

    redirect('/piscine/validation')

}
