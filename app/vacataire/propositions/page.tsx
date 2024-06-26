import {PropositionsTable} from "@/app/ui/table";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Navbar} from "@/app/ui/navbar";
import {PopupFiltreProposition} from "@/app/ui/popup";

export default async function Page({
                                       searchParams,
                                   }:{
    searchParams?: {
        piscine?: string;
        date?: Date;
        state?: string
        page?: string;
    };
}) {
    const supabase = createServerComponentClient({cookies})
    const {data: vacataire} = await supabase.from("vacataire").select()

    const piscine = searchParams?.piscine || '';
    const date = searchParams?.date || null;
    const state = searchParams?.state || '';
    const currentPage = searchParams?.page || 1;

    return (
        <div className="w-full pt-2">
            <Navbar corresponding_page="propositions"/>
            <div className="w-full p-8 z-auto grid justify-items-center">
                <h1 className="text-5xl font-black md:font-extrabold font-sans text-cente">Propositions</h1>
                <PopupFiltreProposition currentState={state == '' ? [] : state.split(',')}/>
                <PropositionsTable piscine={piscine} date={date} state={state}/>
            </div>

        </div>
    )
}