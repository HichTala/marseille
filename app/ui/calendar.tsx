'use client'

import React, {useEffect, useState} from 'react'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid'
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
    startOfWeek
} from "date-fns";
import {Mission, Offer} from "@/app/lib/definition";
import {fr} from "date-fns/locale";
import {PopupEdit} from "@/app/ui/popupedit";
import {getMissions, getMissionCount} from "@/app/ui/get-mission";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Avatar, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faStar, faXmark} from "@fortawesome/free-solid-svg-icons";
import {acceptVac, rejectVac, validationVac} from "@/app/lib/actions";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createClient} from "@/utils/supabase/client";
import {SummaryModal, ValidationModal} from "@/app/ui/display";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Calendar({offers, vacataire}: { offers: Offer[] | null, vacataire: boolean }) {

    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

    let newDays = eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth, {weekStartsOn: 1}),
        end: endOfWeek(endOfMonth(firstDayCurrentMonth), {weekStartsOn: 1})
    })

    function nextMonth() {
        let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1})
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function prevMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: -1})
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    let selectedDayOffers = offers?.filter(
        (offer) => (
            isSameDay(parseISO(offer.startDatetime), selectedDay)
        )
    )

    return (
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="md:pr-14">
                <div className="flex items-center">
                    <h2 className="flex-auto text-sm font-semibold text-gray-900">
                        {format(firstDayCurrentMonth, 'MMMM yyyy', {locale: fr})}
                    </h2>
                    <button
                        type="button"
                        onClick={() => prevMonth()}
                        className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    >
                        <span className="sr-only">Previous month</span>
                        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true"/>
                    </button>
                    <button
                        type="button"
                        onClick={() => nextMonth()}
                        className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                    >
                        <span className="sr-only">Next month</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true"/>
                    </button>
                </div>
                <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                    <div>L</div>
                    <div>M</div>
                    <div>M</div>
                    <div>J</div>
                    <div>V</div>
                    <div>S</div>
                    <div>D</div>
                </div>
                <div className="mt-2 grid grid-cols-7 text-sm">
                    {newDays.map((day, dayIdx) => (
                        <div key={day.toString()}
                             className={`${classNames(
                                 dayIdx > 6 && 'py-1.5',
                                 dayIdx === 0 && colStartClasses[getDay(day)]
                             )} mx-1`}>
                            <button
                                type="button"
                                onClick={() => setSelectedDay(day)}
                                className={classNames(
                                    isEqual(day, selectedDay) && 'text-white',
                                    !isEqual(day, selectedDay) && isToday(day) && 'text-secondary',
                                    !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                                    !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
                                    isEqual(day, selectedDay) && isToday(day) && 'bg-secondary',
                                    isEqual(day, selectedDay) && !isToday(day) && 'bg-primary',
                                    !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                    (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                )}
                            >
                                <time dateTime={format(day, 'dd-mm-yyyy')}>{format(day, 'd')}</time>
                            </button>
                            <div className="w-full flex justify-center">
                                <div className="absolute">
                                    <div className="flex justify-center">
                                        {
                                            offers?.map((offer) => (
                                                isSameDay(parseISO(offer.startDatetime), day)
                                                &&
                                                <OfferIndications offer={offer}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <section className="mt-12 md:mt-0 md:pl-14">
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Planning pour le <time
                    dateTime={format(selectedDay, 'dd-MM-yyyy')}>{format(selectedDay, 'dd MMMM yyyy', {locale: fr})}</time>
                </h2>
                <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                    {(selectedDayOffers?.length ?? 0) > 0 ? (
                        selectedDayOffers?.map((offer) => (
                            vacataire ?
                                <VacataireOffers offer={offer} key={offer.id}/>
                                :
                                <Offers offer={offer} key={offer.id}/>
                        ))
                    ) : (
                        <p>Pas de vacations ce jour</p>
                    )}
                </ol>
            </section>
        </div>
    )
}

function OfferIndications({offer}: { offer: Offer }) {
    // [No vac 0 avail, No vac but avail, vac ok, terminee, cancel]
    const offer_state_color = ['bg-purple-700', 'bg-pink-400', 'bg-green-400', 'bg-purple-300', 'bg-gray-300']

    const [available, setAvailable] = useState(0);

    useEffect(() => {
        const fetchMission = async () => {
            try {
                const offer_id: string = offer.id
                const count = await getMissionCount({offer_id});
                setAvailable(count)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchMission();
    }, []);

    return (
        <div
            className={`w-1 h-1 rounded-full ${available + offer.state != 0 ? offer_state_color[offer.state] : offer_state_color[3]}`}/>
    )
}

function VacataireOffers({offer}: { offer: any }) {
    let startDateTime = parseISO(offer.startDatetime)
    let endDateTime = parseISO(offer.endDatetime)

    const [popupOpen, setIsOpen] = useState(false);
    const [mission, setMission] = useState<Mission | undefined>(undefined);

    const togglePopup = () => {
        setIsOpen(!popupOpen);
    };

    useEffect(() => {
        const fetchMission = async () => {
            try {
                const offer_id: string = offer.id
                const result = (await getMissions({offer_id})).at(0);
                setMission(result);
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        };
        fetchMission();
    })


    return (

        <button className="text-left" onClick={togglePopup}>
            <PopupEdit mission={mission} popupOpen={popupOpen} setIsOpen={setIsOpen}/>
            <li
                className="group flex items-center rounded-xl py-2 focus-within:bg-gray-100 hover:bg-gray-100"
            >
                <img src="/logos/aquasenart.jpg" alt="" className="h-10 w-10 flex-none rounded-full mr-2"/>
                <div>
                    <p className="text-gray-900 font-bold text-xs">{offer.piscine['name']}</p>
                    <p className="text-gray-500 text-[9px]">{offer.piscine['address']}, {offer.piscine['city']}</p>
                    <p className="mt-0.5">
                        <time dateTime={offer.startDatetime}>{format(startDateTime, 'HH:mm')}</time>
                        -{' '}
                        <time dateTime={offer.endDatetime}>{format(endDateTime, 'HH:mm')}</time>
                    </p>
                </div>
            </li>
        </button>
    )
}

export function Offers({offer}: { offer: any }) {
    let startDateTime = parseISO(offer.startDatetime)
    let endDateTime = parseISO(offer.endDatetime)

    const offer_state_color = ['border-purple-700', 'border-pink-400', 'border-green-400', 'border-purple-300', 'border-gray-300']
    const offer_state_nextui_color: ("secondary" | "danger" | "success" | "default" | "primary" | "warning" | undefined)[] = ["secondary", "danger", "success", "secondary", "default"]

    const [missions, setMissions] = useState<Mission[]>([]);

    useEffect(() => {
        const fetchMission = async () => {
            try {
                const offer_id: string = offer.id
                const result = await getMissions({offer_id});
                setMissions(result)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchMission();
    }, []);

    const [popupOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!popupOpen);
    };

    const popMission = (rejected_mission: Mission) => {
        setMissions(missions.filter(mission => mission.id !== rejected_mission.id))
    }

    const [popupValidation, setValidationOpen] = useState(false);
    const [popupSummary, setSummaryOpen] = useState(false);
    const togglePopupValidation = () => {
        setValidationOpen(!popupValidation);
    };
    const togglePopupSummary = () => {
        setSummaryOpen(!popupSummary);
    };

    const disabled = startDateTime > new Date()

    const toggle = [1, 2].includes(offer.state) ? (offer.state == 1 ? togglePopupValidation : togglePopupSummary) : togglePopup

    const supabase = createClient()
    const {data: avatar} = supabase.storage.from("documents")
        .getPublicUrl(offer.vacataire?.avatar ? offer.vacataire?.avatar : "")

    const isPassed = (new Date(offer.startDatetime) < new Date()) && (offer.state == 1)

    return (
        <>
            <Modal className="m-auto" backdrop={"blur"} isOpen={popupOpen} onClose={togglePopup}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Sélection d'un vacataire pour cette
                                mission</ModalHeader>
                            {
                                missions.length > 0 ?
                                    <ModalBody>
                                        <div  className="flex-col gap-1 max-h-[400px] overflow-y-scroll">
                                            {
                                                missions.map((mission) => (
                                                    <CardVacataire mission={mission} offer={offer} onClose={onClose} popMission={popMission}/>
                                                ))
                                            }
                                        </div>
                                    </ModalBody>
                                    :
                                    <ModalBody>
                                        <div  className="flex-col gap-1 max-h-[450px] overflow-y-scroll text-sm text-gray-500">
                                            Il n'y a pas encore de Vacataire postulant à cet offre
                                        </div>
                                    </ModalBody>
                            }
                            <ModalFooter>
                                <Button color="primary" onPress={onClose}>
                                    Ok
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <ValidationModal
                popupOpen={popupValidation}
                togglePopup={togglePopupValidation}
                disabled={disabled}
                offer={offer}
                avatar={avatar.publicUrl}
            />

            <SummaryModal
                popupOpen={popupSummary}
                togglePopup={togglePopupSummary}
                disabled={disabled}
                offer={offer}
                avatar={avatar.publicUrl}
            />

            <button className="w-full" onClick={toggle}>
                <Card
                    className={`border-2 ${missions.length + offer.state != 0 ? (isPassed ? "border-blue-300" : offer_state_color[offer.state]) : offer_state_color[3]}`}>
                    <CardHeader className="justify-between">
                        {
                            offer.vacataire ? (
                                <OfferVacataire offer={offer} avatar={avatar.publicUrl} isPassed={isPassed}/>
                            ) : (
                                <div className="flex gap-5">
                                    <Avatar isBordered color={offer_state_nextui_color[offer.state]} radius="full"
                                            size="md" showFallback src="https://images.unsplash.com/broken"/>
                                    <div className="flex flex-col gap-1 items-start justify-center">
                                        <h4 className="text-small font-semibold leading-none text-default-600">Pas de
                                            vacataire sélectionné</h4>
                                        <h4 className="text-small tracking-tight text-default-400">
                                            <time
                                                dateTime={offer.startDatetime}>{format(startDateTime, 'dd/MM/yy')}</time>
                                        </h4>
                                        <h5 className="text-small tracking-tight text-default-400">
                                            <time dateTime={offer.startDatetime}>{format(startDateTime, 'HH:mm')}</time>
                                            -{' '}
                                            <time dateTime={offer.endDatetime}>{format(endDateTime, 'HH:mm')}</time>
                                        </h5>
                                    </div>
                                </div>
                            )
                        }
                    </CardHeader>
                </Card>
            </button>
        </>
    )
}

function OfferVacataire({offer, avatar, isPassed}:{offer: Offer, avatar: string, isPassed: boolean}) {
    let startDateTime = parseISO(offer.startDatetime)
    let endDateTime = parseISO(offer.endDatetime)

    const offer_state_nextui_color: ("secondary" | "danger" | "success" | "default" | "primary" | "warning" | undefined)[] = ["secondary", "danger", "success"]
    const offer_state = ['À venir', 'Terminée']

    return (
        <div className="flex justify-between w-full">
            <div className="flex gap-5">
                <Avatar isBordered color={isPassed ? "primary" : offer_state_nextui_color[offer.state]} radius="full"
                        className="text-customwhite"
                        size="md"
                        showFallback
                        src={avatar}/>
                <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">{offer.vacataire?.nom} {offer.vacataire?.prenom}</h4>
                    <h4 className="text-small tracking-tight text-default-400">
                        <time dateTime={offer.startDatetime}>{format(startDateTime, 'dd/MM/yy')}</time>
                    </h4>
                    <h4 className="text-small tracking-tight text-default-400">
                        <time dateTime={offer.startDatetime}>{format(startDateTime, 'HH:mm')}</time>
                        {' - '}
                        <time dateTime={offer.endDatetime}>{format(endDateTime, 'HH:mm')}</time>
                    </h4>
                </div>
            </div>
            <div>
                {
                    [1, 2].includes(offer.state)
                    &&
                    <>
                        <Button isDisabled color={isPassed ? "primary" : offer_state_nextui_color[offer.state]} variant="flat">
                            {isPassed ? "Passée" : offer_state[offer.state - 1]}
                        </Button>
                    </>
                }
            </div>
        </div>
    )
}

function CardVacataire({mission, offer, onClose, popMission}: {
    mission: Mission,
    offer: Offer,
    onClose: () => void,
    popMission: (rejected_mission: Mission) => void
}) {

    const duration = mission.offres ? mission.offres['duration'].split(':').map(Number).at(0) : null

    const handleAccept = async () => {
        await acceptVac({mission})
        onClose()
        location.reload()
    }

    const handleReject = async () => {
        await rejectVac({mission})
        popMission(mission)
    }

    const supabase = createClient()

    const {data: url_siren_siret} = supabase.storage.from("documents")
        .getPublicUrl(mission.vacataire["file_siren_siret"])
    const {data: url_certificate} = supabase.storage.from("documents")
        .getPublicUrl(mission.vacataire["file_certificate"])
    const {data: url_pse} = supabase.storage.from("documents")
        .getPublicUrl(mission.vacataire["file_pse"])
    const {data: url_insurance} = supabase.storage.from("documents")
        .getPublicUrl(mission.vacataire["file_insurance"])
    const {data: url_pro_card} = supabase.storage.from("documents")
        .getPublicUrl(mission.vacataire["file_pro_card"])

    const {data: avatar} = supabase.storage.from("documents")
        .getPublicUrl(mission.vacataire["avatar"])

    return (
        <Card className={`border-2 my-1`}>
            <CardHeader className="justify-between">
                <div className="flex gap-5">
                    <Avatar isBordered showFallback radius="full" size="md"
                            src={avatar.publicUrl}/>
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{mission.vacataire['nom']} {mission.vacataire['prenom']}</h4>
                        <h5 className="text-small tracking-tight text-default-400">{mission.vacataire['phone']}</h5>
                    </div>
                </div>
                <div>
                    <div className="flex justify-end items-center">
                        <FontAwesomeIcon icon={faStar}
                                         className="text-amber-400"/>
                        <p className="px-1">{mission.vacataire['scores'] !== null ? mission.vacataire['scores'] : 5}</p>
                    </div>
                    <div className="flex justify-between gap-2">
                        <p className="text-small tracking-tight text-default-400">#Vacations: </p>
                        <p className="text-small font-semibold text-default-400">{mission.vacataire.nb_mission}</p>
                    </div>
                    <div className="flex justify-between gap-2">
                        <p className="text-small tracking-tight text-default-400">#Annulations: </p>
                        <p className="text-small font-semibold text-default-400">{mission.vacataire.nb_annulations}</p>
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <Link className="text-sm" showAnchorIcon
                      href={url_certificate.publicUrl}>Diplôme {mission.vacataire["certificate"]}</Link>
                <Link className="text-sm" showAnchorIcon href={url_pse.publicUrl}>PSE</Link>
                <Link className="text-sm" showAnchorIcon href={url_siren_siret.publicUrl}>SIREN/SIRET</Link>
                <Link className="text-sm" showAnchorIcon href={url_insurance.publicUrl}>Assurance professionnelle</Link>
                <Link className="text-sm" showAnchorIcon href={url_pro_card.publicUrl}>Carte professionnelle</Link>
            </CardBody>
            <CardFooter className="gap-3 justify-between">
                <div className="flex gap-3">
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">{mission.price / 100}</p>
                        <p className=" text-default-400 text-small">€</p>
                    </div>
                    <div className="flex gap-1">
                        <p className="font-semibold text-default-400 text-small">{duration ? (mission.price / 100 / duration).toFixed(2) : '_'}</p>
                        <p className=" text-default-400 text-small">€/Heures</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    <Button isIconOnly color="success" onClick={handleAccept}>
                        <FontAwesomeIcon icon={faCheck} />
                    </Button>
                    <Button isIconOnly color="danger" onClick={handleReject}>
                        <FontAwesomeIcon icon={faXmark} />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

let colStartClasses = [
    'col-start-7',
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6'
]


