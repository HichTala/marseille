import Search, {Datepicker, List} from "@/app/ui/search";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEnvelope, faFilter, faHandshake, faMoneyBill, faStar} from "@fortawesome/free-solid-svg-icons";
import Table, {PropositionsTable} from "@/app/ui/table";
import styles from "@/app/ui/home.module.css";
import Image from "next/image";
import {createClient} from "@/utils/supabase/server";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Suspense} from "react";
import {Details} from "@/app/ui/details";
import {Navbar} from "@/app/ui/navbar";
import {PopupFiltreProposition} from "@/app/ui/popup";

export default async function Page({
                                       searchParams,
                                   }:{
    searchParams?: {
        piscine?: string;
        date?: Date;
        page?: string;
    };
}) {
    const supabase = createServerComponentClient({cookies})
    const {data: vacataire} = await supabase.from("vacataire").select()

    const piscine = searchParams?.piscine || '';
    const date = searchParams?.date || null;
    const currentPage = searchParams?.page || 1;

    return (
        <div className="w-full pt-2">
            <Navbar corresponding_page="propositions"/>
            <div className="w-full p-8 z-auto grid justify-items-center">
                <h1 className="text-5xl font-black md:font-extrabold font-sans text-cente">Propositions</h1>
                <PopupFiltreProposition/>
                <PropositionsTable piscine={piscine} date={date}/>
            </div>

        </div>
    )
}