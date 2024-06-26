import {NavbarPiscine} from "@/app/ui/navbar";
import {PopupFiltreValidation} from "@/app/ui/popup";
import {VacationTable} from "@/app/ui/table";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export default async function Page({
                                       searchParams,
                                   }: {
    searchParams?: {
        vacataire?: string;
        date?: Date;
        state?: string
        page?: string;
    };
}) {
    const supabase = createServerComponentClient({cookies})

    const vacataire = searchParams?.vacataire || '';
    const date = searchParams?.date || null;
    const state = searchParams?.state || '';
    const currentPage = searchParams?.page || 1;
    return (
        <div className="w-full pt-2">
            <NavbarPiscine corresponding_page={"validation"}/>
            <div className="w-full p-8 z-auto grid justify-items-center">
                <h1 className="text-5xl font-black md:font-extrabold font-sans text-cente">Vacations</h1>
                <PopupFiltreValidation currentState={state == '' ? [] : state.split(',')}/>
                <VacationTable vacataire={vacataire} date={date} state={state}/>
            </div>

        </div>
    );
}
