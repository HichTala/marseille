import Search, {DatePicker, List} from "@/app/ui/search";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import Table from "@/app/ui/dashboard/table";
import styles from "@/app/ui/home.module.css";
import Image from "next/image";
import {createClient} from "@/utils/supabase/server";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";

export default async function Page() {
    const supabase = createServerComponentClient({cookies})
    const {data: {user}} = await supabase.auth.getUser()

    return (
        <div className="w-full">
            <nav className={`w-full flex border-b border-b-foreground/10 h-16 relative ${styles.navbar}`}>
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    {user?.id}
                </div>
            </nav>
            <div className="w-full p-12">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-2xl">Offres</h1>
                </div>
                <div className="mt-4 flex items-center justify-between md:mt-8 space-x-5">
                    <Search placeholder="Rechercher piscine..."/>
                    <List placeholder="Diplômes..." list="fonction"/>
                    <DatePicker/>

                    <div className="flex h-10 items-center rounded-lg px-4 text-sm font-medium">
                        <FontAwesomeIcon icon={faFilter} height={25}/>
                    </div>
                </div>
                <Table/>
            </div>

        </div>
    )
}