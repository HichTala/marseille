'use client'

import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendar, faClock, faGraduationCap,
    faHourglassEnd,
    faHourglassStart,
    faMoneyBill1Wave,
    faStar
} from "@fortawesome/free-solid-svg-icons";
import {differenceInHours, format, getHours, parse, parseISO} from "date-fns";
import {Button} from "@nextui-org/button";
import {CheckIcon, XMarkIcon} from "@heroicons/react/16/solid";
import {AcceptVacataire} from "@/app/ui/table";
import React, {useState} from "react";
import {PopupEdit} from "@/app/ui/popupedit";

export function PiscineDisplay({offer}: { offer: any | null }) {
    return (
        <div
            key={offer.id}
            className="w-full cursor-pointer"
        >
            <a href={`/vacataire/offres/${offer.id}/apply`}>
                <div className="w-full rounded-3xl overflow-hidden relative bg-white shadow-md p-2">
                    <div className="flex">
                        <div className="p-1 flex">
                            <Image className="m-auto" src="/logos/aquasenart.jpg" alt="" width={70} height={70}/>
                        </div>
                        <div>
                            <div
                                className="font-black md:font-extrabold font-sans text-cente text-sm">{offer.piscine['name']}</div>
                            <div
                                className="text-gray-400 font-sans text-cente text-xs">{offer.piscine['address']}, {offer.piscine['city']}</div>
                            <div className="flex w-full justify-between px-5 py-2">
                                <div className="text-center">
                                    <p className="text-gray-400 font-sans text-cente text-xs">Début</p>
                                    <p className="text-xs px-1">{format(offer.startDatetime, 'HH:mm')}</p>
                                </div>
                                <div className="border-r-2"/>
                                <div className="text-center">
                                    <p className="text-gray-400 font-sans text-cente text-xs">Pause</p>

                                    <p className="text-xs px-1">( {differenceInHours(parseISO(offer.endDatetime),parseISO(offer.startDatetime))-getHours(parse(offer.duration, 'HH:mm:ss', new Date()))}h )</p>
                                </div>
                                <div className="border-r-2"/>
                                <div>
                                    <p className="text-center text-gray-400 font-sans text-cente text-xs">Fin</p>
                                    <p className="text-xs px-1">{format(offer.endDatetime, 'HH:mm')}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex">
                                    <FontAwesomeIcon icon={faStar} className="text-amber-400 text-xs"/>
                                    <p className="px-1 text-xs">{offer.piscine['score'] !== null ? offer.piscine['score'] : 5}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite mt-1">
                                    <FontAwesomeIcon className="text-[8px]" icon={faCalendar}/>
                                    <p className="text-[8px] px-1">{format(offer.startDatetime, 'dd/MM/yyyy')}</p>
                                </div>
                                <div className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite ml-1 mt-1">
                                    <FontAwesomeIcon className="text-[8px]" icon={faClock}/>
                                    <p className="text-[8px] px-1">{format(parse(offer.duration, 'HH:mm:ss', new Date()), 'HH:mm')}</p>
                                </div>
                                <div className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite ml-1 mt-1">
                                    <FontAwesomeIcon className="text-[8px]" icon={faGraduationCap}/>
                                    <p className="text-[8px] px-1">{offer.certificate}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>

        </div>
    );
}

export function CalendarPropositionDisplay({mission}: { mission: any | null }) {

    const [popupOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!popupOpen);
    };

    return (
        <div
            key={mission.id}
            className="mb-2 w-full grid justify-items-center"
        >
            <PopupEdit popupOpen={popupOpen} setIsOpen={setIsOpen} mission={mission}/>
            <button className="w-full rounded-3xl overflow-hidden relative bg-white shadow-md text-left hover:cursor-pointer" onClick={togglePopup}>
                <div className="flex">
                    <div className="p-2 flex">
                        <div className="p-1 flex">
                            <Image className="m-auto" src="/logos/aquasenart.jpg" alt="" width={70} height={70}/>
                        </div>
                        <div>
                            <div className="font-black md:font-extrabold font-sans text-cente text-sm">
                                {mission.offres['piscine']['name']}
                            </div>
                            <div className="text-gray-400 font-sans text-cente text-xs">
                                {mission.offres['piscine']['address']}, {mission.offres['piscine']['city']}
                            </div>
                            <div className="flex w-full justify-between px-5 py-2">
                                <div className="text-center">
                                    <p className="text-gray-400 font-sans text-cente text-xs">Début</p>
                                    <p className="text-xs px-1">{format(mission.offres['startDatetime'], 'HH:mm')}</p>
                                </div>
                                <div className="border-r-2"/>
                                <div className="text-center">
                                    <p className="text-gray-400 font-sans text-cente text-xs">Pause</p>

                                    <p className="text-xs px-1">( {differenceInHours(parseISO(mission.offres['endDatetime']), parseISO(mission.offres['startDatetime'])) - getHours(parse(mission.offres['duration'], 'HH:mm:ss', new Date()))}h
                                        )</p>
                                </div>
                                <div className="border-r-2"/>
                                <div>
                                    <p className="text-center text-gray-400 font-sans text-cente text-xs">Fin</p>
                                    <p className="text-xs px-1">{format(mission.offres['endDatetime'], 'HH:mm')}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite mt-1">
                                    <FontAwesomeIcon className="text-[8px] m-auto" icon={faCalendar}/>
                                    <p className="text-[8px] px-1">{format(mission.offres['startDatetime'], 'dd/MM/yyyy')}</p>
                                </div>
                                <div
                                    className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite ml-1 mt-1">
                                    <FontAwesomeIcon className="text-[8px] m-auto" icon={faClock}/>
                                    <p className="text-[8px] px-1 m-auto">{format(parse(mission.offres['duration'], 'HH:mm:ss', new Date()), 'HH:mm')}</p>
                                </div>
                                <div
                                    className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite ml-1 mt-1">
                                    <FontAwesomeIcon className="text-[8px] m-auto" icon={faGraduationCap}/>
                                    <p className="text-[8px] px-1 m-auto">{mission.offres['certificate']}</p>
                                </div>
                                <div
                                    className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite ml-1 mt-1">
                                    <FontAwesomeIcon className="text-[8px] m-auto" icon={faMoneyBill1Wave}/>
                                    <p className="text-[8px] px-1 m-auto">{mission.price / 100} €</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<Image src="/piscine_default.jpg" alt="Default swimming pool profile image"*/}
                {/*       className={`w-[70px] md:w-[80px] border-r-[10px] border-${stats[mission.status]}`} width={80}*/}
                {/*       height={100}/>*/}
            </button>
        </div>
    );
}

export function PropositionDisplay({mission}: { mission: any | null }) {

    const stats = ["En Attente", "Acceptée", "Terminée", "Annulée", "Refusée"]
    const stats_color = ["blue-300", "green-300", "amber-200", "gray-300", "red-400"]

    const [popupOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!popupOpen);
    };

    return (
        <div
            key={mission.id}
            className="mb-2 w-full grid justify-items-center"
        >
            <PopupEdit popupOpen={popupOpen} setIsOpen={setIsOpen} mission={mission}/>
            <button className="w-full rounded-3xl overflow-hidden relative bg-white shadow-md text-left hover:cursor-pointer" onClick={togglePopup}>
                <div className="flex">
                    <div className="bg-blue-300 bg-green-300 bg-amber-200 bg-gray-300 bg-red-400 hidden"/>
                    <div
                        className={`bg-${stats_color[mission.status]} w-6 h-100 [writing-mode:vertical-rl] text-center font-bold`}>
                        {stats[mission.status]}
                    </div>
                    <div className="p-2 flex">
                        <div className="p-1 flex">
                            <Image className="m-auto" src="/logos/aquasenart.jpg" alt="" width={70} height={70}/>
                        </div>
                        <div>
                            <div className="font-black md:font-extrabold font-sans text-cente text-sm">
                                {mission.offres['piscine']['name']}
                            </div>
                            <div className="text-gray-400 font-sans text-cente text-xs">
                                {mission.offres['piscine']['address']}, {mission.offres['piscine']['city']}
                            </div>
                            <div className="flex w-full justify-between px-5 py-2">
                                <div className="text-center">
                                    <p className="text-gray-400 font-sans text-cente text-xs">Début</p>
                                    <p className="text-xs px-1">{format(mission.offres['startDatetime'], 'HH:mm')}</p>
                                </div>
                                <div className="border-r-2"/>
                                <div className="text-center">
                                    <p className="text-gray-400 font-sans text-cente text-xs">Pause</p>

                                    <p className="text-xs px-1">( {differenceInHours(parseISO(mission.offres['endDatetime']), parseISO(mission.offres['startDatetime'])) - getHours(parse(mission.offres['duration'], 'HH:mm:ss', new Date()))}h
                                        )</p>
                                </div>
                                <div className="border-r-2"/>
                                <div>
                                    <p className="text-center text-gray-400 font-sans text-cente text-xs">Fin</p>
                                    <p className="text-xs px-1">{format(mission.offres['endDatetime'], 'HH:mm')}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite mt-1">
                                    <FontAwesomeIcon className="text-[8px] m-auto" icon={faCalendar}/>
                                    <p className="text-[8px] px-1">{format(mission.offres['startDatetime'], 'dd/MM/yyyy')}</p>
                                </div>
                                <div
                                    className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite ml-1 mt-1">
                                    <FontAwesomeIcon className="text-[8px] m-auto" icon={faClock}/>
                                    <p className="text-[8px] px-1 m-auto">{format(parse(mission.offres['duration'], 'HH:mm:ss', new Date()), 'HH:mm')}</p>
                                </div>
                                <div
                                    className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite ml-1 mt-1">
                                    <FontAwesomeIcon className="text-[8px] m-auto" icon={faGraduationCap}/>
                                    <p className="text-[8px] px-1 m-auto">{mission.offres['certificate']}</p>
                                </div>
                                <div
                                    className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite ml-1 mt-1">
                                    <FontAwesomeIcon className="text-[8px] m-auto" icon={faMoneyBill1Wave}/>
                                    <p className="text-[8px] px-1 m-auto">{mission.price / 100} €</p>
                                </div>
                                <div
                                    className={`flex bg-${stats_color[mission.status]} rounded-lg py-1 px-2 text-darkblue font-bold ml-1 mt-1`}>
                                    <p className="text-[8px] px-1 m-auto">{stats[mission.status]}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<Image src="/piscine_default.jpg" alt="Default swimming pool profile image"*/}
                {/*       className={`w-[70px] md:w-[80px] border-r-[10px] border-${stats[mission.status]}`} width={80}*/}
                {/*       height={100}/>*/}
            </button>
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
                                <FontAwesomeIcon icon={faMoneyBill1Wave}/>
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

