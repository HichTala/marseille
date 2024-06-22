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
import {Card, CardFooter, CardHeader} from "@nextui-org/card";
import {Avatar, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {acceptVac, validationVac} from "@/app/lib/actions";

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

                                    <p className="text-xs px-1">( {differenceInHours(parseISO(offer.endDatetime), parseISO(offer.startDatetime)) - getHours(parse(offer.duration, 'HH:mm:ss', new Date()))}h
                                        )</p>
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
                                <div
                                    className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite ml-1 mt-1">
                                    <FontAwesomeIcon className="text-[8px]" icon={faClock}/>
                                    <p className="text-[8px] px-1">{format(parse(offer.duration, 'HH:mm:ss', new Date()), 'HH:mm')}</p>
                                </div>
                                <div
                                    className="flex bg-customturquoise rounded-lg py-1 px-2 text-customwhite ml-1 mt-1">
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
            <button
                className="w-full rounded-3xl overflow-hidden relative bg-white shadow-md text-left hover:cursor-pointer"
                onClick={togglePopup}>
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
            <button
                className="w-full rounded-3xl overflow-hidden relative bg-white shadow-md text-left hover:cursor-pointer"
                onClick={togglePopup}>
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

export function VacationDisplay({offer}: { offer: any | null }) {
    const [value, setValue] = useState("5");

    let startDateTime = parseISO(offer.startDatetime)
    let endDateTime = parseISO(offer.endDatetime)

    // const stats = ["en attente", "accepte", "termine", "annulé", "refusée"]
    const stats = ["customblue", "green-300", "amber-200", "gray-300", "red-400"]

    const [popupOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!popupOpen);
    };

    const handleValidation = async () => {
        await validationVac({stars: Number(value), offer})
        location.reload()
    }

    const disabled = startDateTime > new Date()

    return (
        <>
            <ValidationModal
                popupOpen={popupOpen}
                handleValidation={handleValidation}
                togglePopup={togglePopup}
                disabled={disabled}
                value={value}
                setValue={setValue}
            />
            <button className="w-full" onClick={togglePopup}>
                <Card>
                    <CardHeader className="justify-between">
                        <div className="flex justify-between w-full">
                            <div className="flex gap-5">
                                <Avatar isBordered color="danger" radius="full"
                                        size="md"
                                        src="https://nextui.org/avatars/avatar-1.png"/>
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">{offer.vacataire['nom']} {offer.vacataire['prenom']}</h4>
                                    <h5 className="text-small tracking-tight text-default-400">
                                        <time dateTime={offer.startDatetime}>{format(startDateTime, 'HH:mm')}</time>
                                        -{' '}
                                        <time dateTime={offer.endDatetime}>{format(endDateTime, 'HH:mm')}</time>
                                    </h5>
                                </div>
                            </div>
                            <div>
                                {
                                    [1, 2].includes(offer.state)
                                    &&
                                    <>
                                        <Button isDisabled color="danger"
                                                variant="flat">
                                            À venir
                                        </Button>
                                    </>
                                }
                            </div>
                        </div>
                    </CardHeader>
                    <CardFooter>
                        <div className="flex gap-3 justify-end w-full">
                            <div className="flex gap-1">
                                <p className="font-semibold text-default-400 text-small">
                                    <time dateTime={offer.startDatetime}>{format(startDateTime, 'dd/MM/yyyy')}</time>
                                </p>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </button>
        </>
    );
}

export function ValidationModal({popupOpen, togglePopup, value, setValue, handleValidation, disabled}: {
    popupOpen: boolean,
    togglePopup: () => void,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    handleValidation: () => Promise<void>,
    disabled: boolean
}) {
    return (
        <Modal className="m-auto" backdrop={"blur"} isOpen={popupOpen} onClose={togglePopup}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Noter la vacation</ModalHeader>
                        <ModalBody>
                            <div className="flex gap-5">
                                <Input
                                    type="number"
                                    label="Étoiles"
                                    labelPlacement="outside"
                                    value={value}
                                    // @ts-ignore
                                    onChange={setValue}
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <FontAwesomeIcon icon={faStar}
                                                             className="text-amber-400"/>
                                        </div>
                                    }
                                />
                                <div className="flex-col gap-1">
                                    <Button color="success" onClick={handleValidation} isDisabled={disabled}>
                                        Valider la vacation
                                    </Button>
                                    <Button color="danger" className="mt-2">
                                        Annuler la vacation
                                    </Button>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={onClose}>
                                Ok
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

