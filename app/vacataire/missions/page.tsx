import MissionsWrapper from "@/app/ui/missions";
import Calendar from "@/app/ui/calendar";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import styles from "@/app/ui/home.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEnvelope, faHandshake, faMoneyBill, faStar} from "@fortawesome/free-solid-svg-icons";

export default async function Page(){

    const supabase = createServerComponentClient({cookies})
    const {data: vacataire} = await supabase.from("vacataire").select()

    return (
        <div className="w-full">
            <nav className={`w-full flex border-b border-b-foreground/10 h-16 relative ${styles.navbar}`}>
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-white">
                    {vacataire?.at(0)['nom']} {vacataire?.at(0)['prenom']}
                </div>

                <div className="flex flex-1 items-center">
                    <ul className="px-2 text-gray-400 font-bold text-xs flex mr-0 ml-auto">
                        <li className="px-2"><a href="/vacataire/offres">OFFRES</a></li>
                        <li className="px-2"><a href="/vacataire/propositions">PROPOSITION</a></li>
                        <li className="px-2 text-white"><a href="/vacataire/missions">MISSIONS</a></li>
                        <li className="px-2"><a href="/vacataire/paiements">PAIEMENTS</a></li>
                        <li className="px-2"><a href="">NOTES</a></li>
                    </ul>
                </div>
            </nav>

            <div className="w-full p-12">
                <div className="flex w-full items-center justify-between mb-5">
                    <h1 className="text-2xl">Prochaines Missions</h1>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <MissionsWrapper/>
                </div>

                <div className="flex w-full items-center justify-between mb-5 mt-5">
                    <h1 className="text-2xl">Calendriers</h1>
                </div>
                <Calendar/>
            </div>

        </div>
    )
}