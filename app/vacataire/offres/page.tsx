import Search, {DatePicker, List} from "@/app/ui/search";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import Table from "@/app/ui/dashboard/table";
import styles from "@/app/ui/home.module.css";
import Image from "next/image";
import {createClient} from "@/utils/supabase/server";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Suspense} from "react";

export default async function Page({
    searchParams,
                                   }:{
    searchParams?: {
        piscine?: string;
        certificate?: string;
        date?: Date;
        page?: string;
    };
}) {
    const supabase = createServerComponentClient({cookies})
    const {data: vacataire} = await supabase.from("vacataire").select()

    const piscine = searchParams?.piscine || '';
    const certificate = searchParams?.certificate || '';
    const date = searchParams?.date || null;
    const currentPage = searchParams?.page || 1;

    return (
        <div className="w-full">
            <nav className={`w-full flex border-b border-b-foreground/10 h-16 relative ${styles.navbar}`}>
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    {vacataire?.at(0)['nom']} {vacataire?.at(0)['prenom']}
                </div>
            </nav>
            <div className="w-full p-12">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-2xl">Offres</h1>
                </div>
                <div className="mt-4 flex items-center justify-between md:mt-8 space-x-5">
                    <Suspense>
                        <Search placeholder="Rechercher piscine..."/>
                        <List placeholder="Diplômes..." list="fonction"/>
                        <DatePicker/>
                    </Suspense>
                    <div className="flex h-10 items-center rounded-lg px-4 text-sm font-medium">
                        <FontAwesomeIcon icon={faFilter} height={25}/>
                    </div>
                </div>
                <Table piscine={piscine} certificate={certificate} date={date}/>
            </div>

        </div>
    )
}