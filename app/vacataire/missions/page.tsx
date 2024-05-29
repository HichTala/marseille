import MissionsWrapper from "@/app/ui/missions";
import Calendar from "@/app/ui/calendar";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import styles from "@/app/ui/home.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEnvelope, faHandshake, faMoneyBill, faStar} from "@fortawesome/free-solid-svg-icons";
import {Navbar} from "@/app/ui/navbar";

export default async function Page(){

    const supabase = createServerComponentClient({cookies})
    const {data: { user },} = await supabase.auth.getUser()
    const {data:offers} = await supabase
        .from("offres")
        .select(`*, piscine(*)`)
        .eq("user_id", user?.id)

    return (
        <div className="w-full pt-2">
            <Navbar corresponding_page="missions"/>

            <div className="z-auto px-12 pt-12">
                <h1 className="text-5xl font-black md:font-extrabold font-sans text-cente">Prochaines Missions</h1>
            </div>
            <div className="mt-10">
                <MissionsWrapper />
            </div>
            <div className="z-auto px-12 pb-12">
                <h1 className="text-5xl font-black md:font-extrabold font-sans text-cente mt-10">Calendrier</h1>
                <div className="mt-5">
                    <Calendar offers={offers} vacataire={true}/>
                </div>
            </div>
        </div>
    )
}