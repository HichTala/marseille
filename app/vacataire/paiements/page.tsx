import MissionsWrapper from "@/app/ui/missions";
import Calendar from "@/app/ui/calendar";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import styles from "@/app/ui/home.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEnvelope, faHandshake, faMoneyBill, faStar} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default async function Page(){

    const supabase = createServerComponentClient({cookies})
    const {data: vacataire} = await supabase.from("vacataire").select()

    return (
        <div className="w-full">
            <nav className={`w-full flex border-b border-b-foreground/10 h-16 relative ${styles.navbar}`}>
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-white">
                    {vacataire?.at(0)['nom']} {vacataire?.at(0)['prenom']}
                </div>

                <div className="hidden flex-1 items-center md:flex">
                    <ul className="px-2 text-gray-400 font-bold text-xs flex mr-0 ml-auto">
                        <li className="px-2"><a href="/vacataire/offres">OFFRES</a></li>
                        <li className="px-2"><a href="/vacataire/propositions">PROPOSITION</a></li>
                        <li className="px-2"><a href="/vacataire/missions">MISSIONS</a></li>
                        <li className="px-2 text-white"><a href="">PAIEMENTS</a></li>
                        <li className="px-2"><a href="">NOTES</a></li>
                    </ul>
                </div>

                <div className="flex flex-1 justify-between items-center md:hidden">
                    <ul className="px-2 text-gray-400 font-bold text-xs flex">
                        <li className="px-2 text-white"><a href=""><FontAwesomeIcon icon={faEnvelope}/></a></li>
                        <li className="px-2"><a href=""><FontAwesomeIcon icon={faHandshake}/></a></li>
                        <li className="px-2"><a href=""><FontAwesomeIcon icon={faCalendar}/></a></li>
                        <li className="px-2"><a href=""><FontAwesomeIcon icon={faMoneyBill}/></a></li>
                        <li className="px-2"><a href=""><FontAwesomeIcon icon={faStar}/></a></li>
                    </ul>
                </div>
            </nav>

            <div className="w-full pt-12">
                <Image className="ml-auto mr-auto" src="/courbe_ex.png" alt="courbes" width={699} height={505}/>
            </div>




        </div>
    )
}