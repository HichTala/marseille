import Table from "@/app/ui/table";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {Navbar} from "@/app/ui/navbar";
import {PopupFiltreVacation} from "@/app/ui/popup";


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
        <div className="w-full pt-2">
            <Navbar corresponding_page="offres"/>
            <div className="w-full p-8 z-auto grid justify-items-center">
                <h1 className="text-5xl font-black md:font-extrabold font-sans text-cente">Trouvez une vacation</h1>
                <PopupFiltreVacation/>
                <div>
                    <Table piscine={piscine} certificate={certificate} date={date}/>
                </div>
            </div>

        </div>
    )
}