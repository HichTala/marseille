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
import React, {useEffect, useState} from "react";
import {PopupEdit} from "@/app/ui/popupedit";
import {Card, CardFooter, CardHeader} from "@nextui-org/card";
import {
    Avatar,
    Input, Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem, Textarea
} from "@nextui-org/react";
import {acceptVac, annulationVac, validationVac} from "@/app/lib/actions";
import {createClient} from "@/utils/supabase/client";
import {Mission} from "@/app/lib/definition";
import {getMission, getMissions} from "@/app/ui/get-mission";
import {Offers} from "@/app/ui/calendar";

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

    let startDateTime = parseISO(offer.startDatetime)
    let endDateTime = parseISO(offer.endDatetime)

    // const stats = ["en attente", "accepte", "termine", "annulé", "refusée"]
    const stats = ["customblue", "green-300", "amber-200", "gray-300", "red-400"]

    const [popupOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!popupOpen);
    };

    const disabled = startDateTime > new Date()

    const supabase = createClient()
    const {data: avatar} = supabase.storage.from("documents")
        .getPublicUrl(offer.vacataire?.avatar ? offer.vacataire?.avatar : "")

    return (
        <>
            <Offers offer={offer}/>
        </>
    );
}

export function ValidationModal({popupOpen, togglePopup, disabled, offer, avatar}: {
    popupOpen: boolean,
    togglePopup: () => void,
    disabled: boolean,
    offer: any
    avatar: string
}) {
    const [value, setValue] = useState("5");

    const handleValidation = async () => {
        await validationVac({stars: Number(value), offer})
        location.reload()
    }
    const handleAnnulation = async () => {
        await annulationVac({offer})
        location.reload()
    }

    const handleSelectionChange = (e: any) => {
        setValue(e.target.value);
    };
    return (
        <Modal className="m-auto" backdrop={"blur"} isOpen={popupOpen} onClose={togglePopup}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Noter la vacation</ModalHeader>
                        <ModalBody>
                            <div className="flex gap-5">
                                <Avatar isBordered showFallback color="danger" radius="full"
                                        size="md"
                                        src={avatar}/>
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="text-small font-semibold leading-none text-default-600">{offer.vacataire['nom']} {offer.vacataire['prenom']}</h4>
                                    <h5 className="text-small tracking-tight text-default-400">{offer.vacataire?.phone}</h5>
                                </div>
                            </div>

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

                            <Select
                                label="Étoiles"
                                labelPlacement="outside"
                                selectedKeys={[value]}
                                onChange={handleSelectionChange}
                                className="max-w-xs"
                                endContent={
                                    <div className="pointer-events-none flex items-center">
                                        <FontAwesomeIcon icon={faStar}
                                                         className="text-amber-400"/>
                                    </div>
                                }>
                                {
                                    [
                                        {key: 0, label: "0"},
                                        {key: 1, label: "1"},
                                        {key: 2, label: "2"},
                                        {key: 3, label: "3"},
                                        {key: 4, label: "4"},
                                        {key: 5, label: "5"}
                                    ].map((score) => (
                                        <SelectItem key={score.key}>
                                            {score.label}
                                        </SelectItem>
                                    ))
                                }
                            </Select>

                            <Textarea label="Commentaire" className="max-w-xs" />

                        </ModalBody>
                        <ModalFooter>
                            <div className="flex gap-1">
                                <Button color="success" onClick={handleValidation} isDisabled={disabled}>
                                    Valider la vacation
                                </Button>
                                <Button color="danger" onClick={handleAnnulation}>
                                    Annuler la vacation
                                </Button>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export function SummaryModal({popupOpen, togglePopup, disabled, offer, avatar}: {
    popupOpen: boolean,
    togglePopup: () => void,
    disabled: boolean,
    offer: any
    avatar: string
}) {

    const [mission, setMission] = useState<Mission | undefined>(undefined);
    useEffect(() => {
        const fetchMission = async () => {
            try {
                const offer_id: string = offer.id
                const user_id: string = offer.vacataire.id
                const result = (await getMission({offer_id, user_id})).at(0);
                setMission(result);
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        };
        fetchMission();
    })

    const duration = offer['duration'].split(':').map(Number).at(0)

    const supabase = createClient()

    const {data: url_siren_siret} = supabase.storage.from("documents")
        .getPublicUrl(mission ? mission.vacataire["file_siren_siret"] : "")
    const {data: url_certificate} = supabase.storage.from("documents")
        .getPublicUrl(mission ? mission.vacataire["file_certificate"] : "")
    const {data: url_pse} = supabase.storage.from("documents")
        .getPublicUrl(mission ? mission.vacataire["file_pse"] : "")
    const {data: url_insurance} = supabase.storage.from("documents")
        .getPublicUrl(mission ? mission.vacataire["file_insurance"] : "")
    const {data: url_pro_card} = supabase.storage.from("documents")
        .getPublicUrl(mission ? mission.vacataire["file_pro_card"] : "")

    return (
        <Modal className="m-auto" backdrop={"blur"} isOpen={popupOpen} onClose={togglePopup}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Résumer de la Vacation</ModalHeader>
                        <ModalBody>
                            <div className="flex justify-between">
                                <div className="flex gap-5">
                                    <Avatar isBordered showFallback color="success" radius="full"
                                            size="md"
                                            src={avatar}/>
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-small font-semibold leading-none text-default-600">{offer.vacataire['nom']} {offer.vacataire['prenom']}</h4>
                                        <h5 className="text-small tracking-tight text-default-400">{offer.vacataire?.phone}</h5>
                                    </div>
                                </div>

                                <div className="flex justify-end items-center">
                                    <FontAwesomeIcon icon={faStar}
                                                     className="text-amber-400"/>
                                    <p className="px-1">{offer.vacataire['scores'] !== null ? offer.vacataire['scores'] : 5}</p>
                                </div>
                            </div>

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

                            <div className="flex-col">
                                <div>
                                    <Link className="text-sm" showAnchorIcon
                                          href={url_certificate.publicUrl}>Diplôme {mission?.vacataire["certificate"]}</Link>
                                </div>

                                <div>
                                    <Link className="text-sm" showAnchorIcon href={url_pse.publicUrl}>PSE</Link>
                                </div>

                                <div>
                                    <Link className="text-sm" showAnchorIcon href={url_siren_siret.publicUrl}>SIREN/SIRET</Link>
                                </div>
                                <div>
                                    <Link className="text-sm" showAnchorIcon href={url_insurance.publicUrl}>Assurance professionnelle</Link>
                                </div>
                                <div>
                                    <Link className="text-sm" showAnchorIcon href={url_pro_card.publicUrl}>Carte professionnelle</Link>
                                </div>
                            </div>

                        </ModalBody>
                        <ModalFooter className="gap-3 justify-between">
                            <div className="flex gap-3">
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 text-small">{mission?.price ? mission?.price / 100 : "_"}</p>
                                    <p className=" text-default-400 text-small">€</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className="font-semibold text-default-400 text-small">{mission?.price ? (mission?.price / 100 / duration).toFixed(2) : '_'}</p>
                                    <p className=" text-default-400 text-small">€/Heures</p>
                                </div>
                            </div>
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

