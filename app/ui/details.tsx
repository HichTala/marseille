'use server'

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {notFound} from "next/navigation";
import {OfferForm} from "@/app/ui/forms";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendar, faClock, faGraduationCap,
    faStar
} from "@fortawesome/free-solid-svg-icons";
import {differenceInHours, format, getHours, parse, parseISO} from "date-fns";

export async function Details({
                                  offer_id
                              }: {
    offer_id: string
}) {
    const supabase = createServerComponentClient({cookies})
    const {data: offers} = await supabase
        .from("offres")
        .select(`*, piscine (*)`)
        .eq("id", offer_id)

    if (!offers) {
        notFound()
    }

    return (
        <div className="max-w-[600px] w-full">
            {offers?.map((offer) => (
                <DisplayDetails offer={offer}/>
            ))}
        </div>
    )
}

export async function DisplayDetails({offer}: { offer: any | null }) {
    return (
        <div
            key={offer.id}
            className="w-full z-[-1]"
        >
            <p className="text-2xl text-darkblue dark:text-customwhite md:text-4xl font-extrabold pt-2">{offer.piscine['name']}</p>
            <div className="justify-between">
                <p className="text-gray-500 dark:text-beige">{offer.piscine['address']}</p>
                <div className="flex justify-between">
                    <p className="text-gray-500 dark:text-beige font-light">{offer.piscine['city']}</p>
                    <div className="flex">
                        <FontAwesomeIcon icon={faStar} className="text-amber-400"/>
                        <p className="px-1 text-sm">{offer.piscine['score'] !== null ? offer.piscine['score'] : 5}</p>
                    </div>
                </div>
                <div className="flex justify-between p-2">
                    <div className="flex">
                        <FontAwesomeIcon icon={faCalendar}/>
                        <p className="text-sm px-1">{format(offer.startDatetime, 'dd/MM/yyyy')}</p>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faClock}/>
                        <p className="text-sm px-1">{format(parse(offer.duration, 'HH:mm:ss', new Date()), 'HH:mm')}</p>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faGraduationCap}/>
                        <p className="text-sm px-1">{offer.certificate}</p>
                    </div>
                </div>
            </div>

            <div
                className="flex justify-between px-5 md:px-12 py-5 mt-3 bg-white border-8 border-customblue shadow-md md:bg-customwhite text-darkblue rounded-full">
            <div className="flex w-full justify-between px-5 py-2">
                    <div className="text-center">
                        <p className="text-gray-400 font-sans text-cente text-sm">Début</p>
                        <p className="text-sm px-1">{format(offer.startDatetime, 'HH:mm')}</p>
                    </div>
                    <div className="border-r-2"/>
                    <div className="text-center">
                        <p className="text-gray-400 font-sans text-cente text-sm">Pause</p>

                        <p className="text-sm px-1">( {differenceInHours(parseISO(offer.endDatetime), parseISO(offer.startDatetime)) - getHours(parse(offer.duration, 'HH:mm:ss', new Date()))}h
                            )</p>
                    </div>
                    <div className="border-r-2"/>
                    <div>
                        <p className="text-center text-gray-400 font-sans text-cente text-sm">Fin</p>
                        <p className="text-sm px-1">{format(offer.endDatetime, 'HH:mm')}</p>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <p className="text-darkblue dark:text-customwhite font-extrabold text-xl pt-4">Description</p>
                <p className="">{offer.description}</p>
            </div>

            <p className="text-darkblue dark:text-customwhite font-extrabold text-xl pt-4">Terme et Conditions</p>
            <p className="text-gray-500 text-sm pt-2 hover:underline cursor-pointer dark:text-beige">premiercontrat398A34.pdf</p>
            <p className="text-gray-500 text-sm hover:underline cursor-pointer dark:text-beige">deuxiemecontrat123476.pdf</p>

            <OfferForm offer={offer}/>
        </div>
    );
}