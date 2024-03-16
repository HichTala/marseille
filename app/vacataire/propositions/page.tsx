import Search, {DatePicker, List} from "@/app/ui/search";
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
        <div className="w-full">
            <nav className={`w-full flex border-b border-b-foreground/10 h-16 relative ${styles.navbar}`}>
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-white">
                    {vacataire?.at(0)['nom']} {vacataire?.at(0)['prenom']}
                </div>

                <div className="hidden flex-1 items-center md:flex">
                    <ul className="px-2 text-gray-400 font-bold text-xs flex mr-0 ml-auto">
                        <li className="px-2"><a href="/vacataire/offres">OFFRES</a></li>
                        <li className="px-2 text-white"><a href="">PROPOSITION</a></li>
                        <li className="px-2"><a href="/vacataire/missions">MISSIONS</a></li>
                        <li className="px-2"><a href="/vacataire/paiements">PAIEMENTS</a></li>
                        <li className="px-2"><a href="">NOTES</a></li>
                    </ul>
                </div>

                <div className="flex flex-1 justify-between items-center md:hidden">
                    <ul className="px-2 text-gray-400 font-bold text-xs flex">
                        <li className="px-2 text-white"><a href=""><FontAwesomeIcon icon={faEnvelope} /></a></li>
                        <li className="px-2"><a href=""><FontAwesomeIcon icon={faHandshake} /></a></li>
                        <li className="px-2"><a href=""><FontAwesomeIcon icon={faCalendar} /></a></li>
                        <li className="px-2"><a href=""><FontAwesomeIcon icon={faMoneyBill} /></a></li>
                        <li className="px-2"><a href=""><FontAwesomeIcon icon={faStar} /></a></li>
                    </ul>
                </div>
            </nav>
            <div className="w-full p-12">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-2xl">Propositions</h1>
                </div>
                <div className="mt-4 flex items-center justify-between md:mt-8 space-x-5 sm:grid-cols-1 lg:grid-cols-4">
                    <Suspense>
                        <div className="grid-cols-1 space-y-3 w-full">
                            <Search placeholder="Rechercher piscine..."/>
                            <DatePicker/>
                        </div>
                    </Suspense>
                    <div className="flex h-10 items-center rounded-lg px-4 text-sm font-medium">
                        <FontAwesomeIcon icon={faFilter} height={25}/>
                    </div>
                </div>
                <PropositionsTable piscine={piscine} date={date}/>
            </div>

        </div>
    )
}