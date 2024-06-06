import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {CalendarPropositionDisplay} from "@/app/ui/display";
import React from "react";
import {Link} from "@nextui-org/react";

export default async function MissionsWrapper() {

    const today = new Date('2023-06-06')

    const supabase = createServerComponentClient({cookies})
    const {data:missions} = await supabase
        .from("missions")
        .select(`*, offres(*, piscine(*))`)
        .eq("status", 1)
        .gt("offres.startDatetime", today.toISOString())
        .order("startDatetime", {referencedTable: "offres"})
        .limit(4)

    return (
        <div className="flex overflow-x-auto">
            {missions?.map((mission) => (
                <div className="flex-shrink-0 m-2 max-w-80">
                    <CalendarPropositionDisplay mission={mission}/>
                </div>
            ))}
            {
                missions?.length == 0
                &&
                <div className="px-12 w-full">
                    <p className="mb-1 text-gray-500">Vous n'avez pas encore de mission prévu pour l'instant, n'hésitez pas à postuler !</p>
                    <div className="w-full flex justify-end">
                        <Link isBlock showAnchorIcon href="#" color="primary">Postuler</Link>
                    </div>
                </div>
            }
        </div>
    );
}
