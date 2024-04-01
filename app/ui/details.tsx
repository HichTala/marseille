'use server'

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {notFound} from "next/navigation";
import {OfferForm} from "@/app/ui/forms";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faHourglass,
    faHourglassEnd,
    faHourglassStart,
    faStar,
    faUser
} from "@fortawesome/free-solid-svg-icons";

export async function Details({
                                  offer_id
                              }: {
    offer_id: string
}) {
    const supabase = createServerComponentClient({cookies})
    const {data: offers} = await supabase.from("offres").select().eq("id", offer_id)

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
            <div className="w-full rounded-3xl overflow-hidden relative h-[100px] md:h-[220px] z-[-1]">
                <Image src="/piscine_default.jpg" alt="Default swimming pool profile image" width={600} height={200} className="z-[-1]"/>

                <div className="flex justify-between bg-black bg-opacity-20 py-1 absolute w-full bottom-0 px-4 text-customwhite font-bold">
                    <div className="flex">
                        <FontAwesomeIcon icon={faCalendar}/>
                        <p className="text-sm px-1">{offer.date}</p>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faUser}/>
                        <p className="text-sm px-1">{offer.certificate}</p>
                    </div>
                </div>
            </div>
            <p className="text-2xl text-darkblue dark:text-customwhite md:text-4xl font-extrabold pt-2">{offer.name}</p>
            <div className="justify-between">
                <p className="text-gray-500 dark:text-beige">{offer.address}</p>
                <div className="flex justify-between">
                    <p className="text-gray-500 dark:text-beige font-light">{offer.city}</p>
                    <div className="flex">
                    <FontAwesomeIcon icon={faStar} className="text-amber-400"/>
                        <p className="px-1 text-sm">{offer.score !== null ? offer.score : 5}</p>
                        <p className="px-3 text-sm">(0 avis)</p>
                    </div>
                </div>
            </div>

            <div
                className="flex justify-between px-5 md:px-12 py-5 mt-12 bg-white border-8 border-customblue shadow-md md:bg-customwhite text-darkblue rounded-full">
                <div className="grid justify-items-center">
                    <FontAwesomeIcon className="font-extrabold" icon={faHourglass}/>
                    <p className="text-sm pt-2">{offer.duration}</p>
                </div>
                <div className="grid justify-items-center">
                    <FontAwesomeIcon className="font-extrabold" icon={faHourglassStart}/>
                    <p className="text-sm pt-2">{offer.start}</p>
                </div>
                <div className="grid justify-items-center">
                    <FontAwesomeIcon className="font-extrabold" icon={faHourglassEnd}/>
                    <p className="text-sm pt-2">{offer.end}</p>
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