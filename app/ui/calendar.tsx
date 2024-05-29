'use client'

import {Fragment, useState} from 'react'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid'
import {Menu, Transition} from '@headlessui/react'
import {EllipsisVerticalIcon} from '@heroicons/react/24/outline'
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
import {Offer} from "@/app/lib/definition";
import {fr} from "date-fns/locale";

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
        console.log("next month")
        let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1})
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function prevMonth() {
        console.log("prev month")
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: -1})
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    console.log(offers)

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
                        {format(firstDayCurrentMonth, 'MMMM yyyy', { locale: fr })}
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
                             className={classNames(
                                 dayIdx > 6 && 'py-1.5',
                                 dayIdx === 0 && colStartClasses[getDay(day)]
                             )}>
                            <button
                                type="button"
                                onClick={() => setSelectedDay(day)}
                                className={classNames(
                                    isEqual(day, selectedDay) && 'text-white',
                                    !isEqual(day, selectedDay) && isToday(day) && 'text-indigo-600',
                                    !isEqual(day, selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                                    !isEqual(day, selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
                                    isEqual(day, selectedDay) && isToday(day) && 'bg-indigo-600',
                                    isEqual(day, selectedDay) && !isToday(day) && 'bg-customblue',
                                    !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                    (isEqual(day, selectedDay) || isToday(day)) && 'font-semibold',
                                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                )}
                            >
                                <time dateTime={format(day, 'dd-mm-yyyy')}>{format(day, 'd')}</time>
                            </button>
                            <div className="flex justify-center">
                                {offers?.some((offer) =>
                                    isSameDay(parseISO(offer.startDatetime), day)
                                ) && (
                                    <div className="absolute w-1 h-1 mt-1 rounded-full bg-customblue"/>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <section className="mt-12 md:mt-0 md:pl-14">
                <h2 className="text-base font-semibold leading-6 text-gray-900">
                    Planning pour le <time
                    dateTime={format(selectedDay, 'dd-MM-yyyy')}>{format(selectedDay, 'dd MMMM yyyy', { locale: fr })}</time>
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

function VacataireOffers({offer}: { offer: any }) {
    let startDateTime = parseISO(offer.startDatetime)
    let endDateTime = parseISO(offer.endDatetime)

    return (
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
            <Menu as="div"
                  className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
                <div>
                    <Menu.Button
                        className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true"/>
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Edit
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Cancel
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </li>
    )
}

function Offers({offer}: { offer: any }) {
    let startDateTime = parseISO(offer.startDatetime)
    let endDateTime = parseISO(offer.endDatetime)

    return (
        <li
            className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100"
        >
            <img src="https://i.imgur.com/tdi3NGa.png" alt="" className="h-10 w-10 flex-none rounded-full"/>
            <div className="flex-auto">
                {
                    offer.vacataire ? (
                        <p className="text-gray-900">{offer.vacataire['nom']} {offer.vacataire['prenom']}</p>
                    ) : (
                        <p className="text-gray-900">Pas de vacataire sélectionné</p>
                    )
                }
                <p className="mt-0.5">
                    <time dateTime={offer.startDatetime}>{format(startDateTime, 'HH:mm')}</time>
                    -{' '}
                    <time dateTime={offer.endDatetime}>{format(endDateTime, 'HH:mm')}</time>
                </p>
            </div>
            <Menu as="div"
                  className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
                <div>
                    <Menu.Button
                        className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true"/>
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Edit
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({active}) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Cancel
                                    </a>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </li>
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
