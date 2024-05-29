import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays, faMoneyBill1Wave, faWaterLadder} from "@fortawesome/free-solid-svg-icons";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {PropositionDisplay, VacationDisplay} from "@/app/ui/display";

export default async function MissionsWrapper() {

    const today = new Date('2023-04-25')

    const supabase = createServerComponentClient({cookies})
    const {data:missions} = await supabase
        .from("missions")
        .select(`*, offres(*, piscine(*))`)
        .gt("offres.startDatetime", today.toISOString())
        .order("startDatetime", {referencedTable: "offres"})
        .limit(4)

    console.log(missions)

    return (
        <div className="flex overflow-x-auto">
            {missions?.map((mission) => (
                <div className="flex-shrink-0 m-2 max-w-80">
                    <PropositionDisplay mission={mission}/>
                </div>
            ))}
            {missions?.map((mission) => (
                <div className="flex-shrink-0 m-2 max-w-80">
                    <PropositionDisplay mission={mission}/>
                </div>
            ))}
            {missions?.map((mission) => (
                <div className="flex-shrink-0 m-2 max-w-80">
                    <PropositionDisplay mission={mission}/>
                </div>
            ))}
            {missions?.map((mission) => (
                <div className="flex-shrink-0 m-2 max-w-80">
                    <PropositionDisplay mission={mission}/>
                </div>
            ))}
        </div>
    );
}
