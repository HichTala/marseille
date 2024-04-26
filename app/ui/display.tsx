'use client'

import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendar, faHourglass,
    faHourglassEnd,
    faHourglassStart,
    faMoneyBill,
    faStar,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {format} from "date-fns";
import {Button} from "@nextui-org/button";
import {CheckIcon, XMarkIcon} from "@heroicons/react/16/solid";
import {AcceptVacataire} from "@/app/ui/table";

export function PiscineDisplay({offer}: { offer: any | null }) {
    return (
        <div
            key={offer.id}
            className="w-full cursor-pointer"
        >
            <a href={`/vacataire/offres/${offer.id}/apply`}>
                <div className="w-full rounded-3xl overflow-hidden relative h-[200px] max-w-[400px] md:h-[270px]">
                    <Image src="/piscine_default.jpg" alt="Default swimming pool profile image" width={400}
                           height={200}/>
                    <div className="bg-black bg-opacity-25 py-2.5 absolute w-full bottom-0 px-2">
                        <div
                            className="text-customwhite text-xl font-extrabold">{offer.piscine['name']}</div>

                        <div
                            className="text-customwhite text-lg flex justify-between">
                            {offer.city}
                            <div className="flex pt-2">
                                <FontAwesomeIcon icon={faCalendar}/>
                                <p className="text-sm px-1">{format(offer.startDatetime, 'dd/MM/yyyy')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex pt-2 px-5 justify-between">
                    <div className="flex">
                        <FontAwesomeIcon icon={faStar} className="text-amber-400"/>
                        <p className="px-1 text-sm">{offer.piscine['score'] !== null ? offer.piscine['score'] : 5}</p>
                        <p className="px-3 text-sm">(0 avis)</p>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faUser}/>
                        <p className="text-sm px-1">{offer.certificate}</p>
                    </div>
                </div>
                <div className="flex pt-2 px-5 justify-between">
                    <div className="flex">
                        <FontAwesomeIcon icon={faHourglass}/>
                        <p className="text-sm px-1">{offer.duration}</p>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faHourglassStart}/>
                        <p className="text-sm px-1">{format(offer.startDatetime, 'HH:mm')}</p>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faHourglassEnd}/>
                        <p className="text-sm px-1">{format(offer.endDatetime, 'HH:mm')}</p>
                    </div>

                </div>
            </a>

        </div>
    );
}

export function PropositionDisplay({mission}: { mission: any | null }) {

    // const stats = ["en attente", "accepte", "termine", "annulé", "refusée"]
    const stats = ["customblue", "green-300", "amber-200", "gray-300", "red-400"]

    return (
        <div
            key={mission.id}
            className="mb-2 w-full grid justify-items-center"
        >
            <div
                className="w-full rounded-3xl overflow-hidden relative h-[120px] max-w-[400px] md:h-[120px] bg-white dark:bg-gray-700 flex">
                <Image src="/piscine_default.jpg" alt="Default swimming pool profile image"
                       className={`w-[70px] md:w-[80px] border-r-[10px] border-${stats[mission.status]}`} width={80}
                       height={100}/>
                <div>
                    <div className="text-darkblue dark:text-customwhite md:text-xl font-extrabold px-2 pt-2">
                        {mission.offres['piscine']['name']}
                    </div>
                    <div className="flex justify-between pb-2">
                        <div>
                            <div
                                className="text-darkblue dark:text-customwhite text-sm pl-2 pb-2">
                                {mission.offres['piscine']['city']}
                            </div>
                            <div className="flex pl-2">
                                <FontAwesomeIcon icon={faCalendar}/>
                                <p className="text-xs px-1">{mission.offres['date']}</p>
                            </div>
                            <div className="flex pl-2">
                                <FontAwesomeIcon icon={faMoneyBill}/>
                                <p className="text-xs px-1">{mission.price / 100} €</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex pt-0.5 pr-1.5">
                                <FontAwesomeIcon icon={faHourglass}/>
                                <p className="text-xs px-1">{mission.offres['duration']}</p>
                            </div>
                            <div className="flex pt-0.5 pr-1.5">
                                <FontAwesomeIcon icon={faHourglassStart}/>
                                <p className="text-xs px-1">{mission.offres['start']}</p>
                            </div>
                            <div className="flex pt-0.5 pr-1.5">
                                <FontAwesomeIcon icon={faHourglassEnd}/>
                                <p className="text-xs px-1">{mission.offres['end']}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export function VacationDisplay({mission}: { mission: any | null }) {

    // const stats = ["en attente", "accepte", "termine", "annulé", "refusée"]
    const stats = ["customblue", "green-300", "amber-200", "gray-300", "red-400"]

    return (
        <div
            key={mission.id}
            className="mb-2 w-full grid justify-items-center"
        >
            <div
                className="w-full rounded-3xl overflow-hidden relative h-[120px] max-w-[400px] md:h-[120px] bg-white dark:bg-gray-700 flex">
                <Image src="/piscine_default.jpg" alt="Default swimming pool profile image"
                       className={`w-[70px] md:w-[80px] border-r-[10px] border-${stats[mission.status]}`} width={80}
                       height={100}/>
                <div>
                    <div className="text-darkblue dark:text-customwhite md:text-xl font-extrabold px-2 pt-2">
                        {mission.vacataire['nom']} {mission.vacataire['prenom']}
                    </div>
                    <div className="flex justify-between pb-2">
                        <div>
                            <div className="flex pl-2">
                                <FontAwesomeIcon icon={faCalendar}/>
                                <p className="text-xs px-1">{format(mission.offres['startDatetime'], 'dd/MM/yy')}</p>
                            </div>
                            <div className="flex pl-2">
                                <FontAwesomeIcon icon={faMoneyBill}/>
                                <p className="text-xs px-1">{mission.price / 100} €</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex pt-0.5 pr-1.5">
                                <FontAwesomeIcon icon={faHourglassStart}/>
                                <p className="text-xs px-1">{format(mission.offres['startDatetime'], 'HH:mm')}</p>
                            </div>
                            <div className="flex pt-0.5 pr-1.5">
                                <FontAwesomeIcon icon={faHourglassEnd}/>
                                <p className="text-xs px-1">{format(mission.offres['endDatetime'], 'HH:mm')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center justify-center">
                        <Button
                            isIconOnly
                            color="success"
                            aria-label="Accepter"
                            size="sm"
                            onClick={() => AcceptVacataire(mission.offres['id'], mission.vacataire['id'])}
                        >
                            <CheckIcon/>
                        </Button>
                        <Button isIconOnly color="danger" variant="bordered" aria-label="Refuser" size="sm">
                            <XMarkIcon/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}