import MissionsWrapper from "@/app/ui/missions";
import Calendar from "@/app/ui/calendar";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import styles from "@/app/ui/home.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faEnvelope, faHandshake, faMoneyBill, faStar} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
// import './paiment.css'
import {Navbar} from "@/app/ui/navbar";
import {AnnualTotal, DetailsFacturation, SalesPerMounth} from "@/app/ui/paiements";

export default async function Page() {

    const supabase = createServerComponentClient({cookies})
    const {data: vacataire} = await supabase.from("vacataire").select()

    return (
        <div className="w-full pt-2">
            <Navbar corresponding_page="paiements"/>
            <div className="w-full p-8 z-auto grid justify-items-center">
                <h1 className="text-5xl font-black md:font-extrabold font-sans text-cente">Paiements</h1>
                <AnnualTotal/>
                <SalesPerMounth/>
                <DetailsFacturation/>
            </div>

        </div>
    )
}