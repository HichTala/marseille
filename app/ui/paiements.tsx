'use client'

import {Accordion, AccordionItem, Listbox, ListboxItem} from "@nextui-org/react";
import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {usePress} from "@react-aria/interactions";
import React, {useEffect, useState} from "react";
import {getMissions, getMissionsPaiements} from "@/app/ui/get-mission";
import {Mission} from "@/app/lib/definition";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";

export function AnnualTotal({total}: { total: number }) {
    return (
        <div
            className="w-[180px] h-[120px] rounded-full pt-5 mt-12 border-8 border-customblue grid justify-items-center">
            <p>Total annuel:</p>
            <p> {total} €</p>
        </div>
    );
}

export function SalesPerMounth({index, selectedMounth, mounth, recaps, max}: {
    index: number,
    selectedMounth: number,
    mounth: string,
    recaps: PaiementRecap[],
    max: number
}) {

    const percentage = Math.trunc(mounth_sum(recaps[index]) * 99 / max) + 1

    const bgColorClass = index == selectedMounth ? "bg-customblue" : "bg-gray-300"
    const heightClass = `h-[${percentage}%]`

    return (
        <div className="mr-5">
            <div className="flex w-full h-[128px] justify-center items-end">
                <div
                    className={`${bgColorClass} w-6 ${heightClass} rounded-lg hover:bg-customblue`}/>
            </div>
            <p className={index == selectedMounth ? "text-customblue font-bold" : ""}>{mounth}</p>
        </div>
    );
}

interface PaiementRecap {
    [key: string]: PiscineRecap;
}

interface PiscineRecap {
    [key: string]: number
}

function sum(piscineRecap: PiscineRecap) {
    let price_sum = 0
    for (let key in piscineRecap) {
        price_sum += piscineRecap[key]
    }

    return price_sum
}

function mounth_sum(paiementRecap: PaiementRecap) {
    let mounthSum = 0

    for (let key in paiementRecap) {
        mounthSum += sum(paiementRecap[key])
    }

    return mounthSum
}

function PaiementsDetails({prices}: { prices: PiscineRecap }) {
    const recapMap = new Map<string, number>(Object.entries(prices))

    return (
        <div>
            {
                Array.from(recapMap).map(([name, price], index) => {
                    return (
                        <div className="flex justify-between px-3">
                            <p className="text-xs text-default-400">{name}</p>
                            <div className="flex gap-1">
                                <p className="font-semibold text-default-400 text-small">{price / 100}</p>
                                <p className="text-default-400 text-small">€</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export function DetailsFacturation() {

    const [recaps, setRecaps] = useState<PaiementRecap[]>([]);
    const [selectedMounth, setSelectedMounth] = useState((new Date()).getMonth());

    useEffect(() => {
        const fetchMission = async () => {
            try {
                const result = await getMissionsPaiements();
                setRecaps(result)
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        };
        fetchMission();
    })

    let total = 0
    let max = 1
    recaps.map((recap) => {
        let mSum = mounth_sum(recap)
        total += mSum
        if (mSum > max) {
            max = mSum
        }
    })

    const handleMonthSelection = (index: number) => {
        setSelectedMounth(index)
    }

    const recapMap = recaps[selectedMounth] ? new Map<string, PiscineRecap>(Object.entries(recaps[selectedMounth])) : new Map<string, PiscineRecap>()

    const mounths = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec']

    mounths.map((mounth, index) => {
        // console.log(mounth, `${index == selectedMounth ? "bg-customblue" : "bg-gray-300"} w-6 h-[${Math.trunc(mounth_sum(recaps[index]) * 99 / max) + 1}%] rounded-lg hover:bg-customblue`)
    })

    return (
        <>
            <AnnualTotal total={total / 100}/>

            <div className="flex m-2 justify-center items-center">
                <div
                    className="main-container mt-5 items-center text-darkblue dark:text-beige max-w-[300px] md:max-w-none">
                    <div className="flex overflow-x-auto m-auto items-end">
                        {
                            mounths.map((mounth, index) => (
                                <button onClick={() => handleMonthSelection(index)}>
                                    <SalesPerMounth mounth={mounth} index={index} max={max} selectedMounth={selectedMounth} recaps={recaps}/>
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="w-full mt-10">
                <h1 className="text-xl font-black textfont-sans text-cente mb-1">Détail</h1>
                <Accordion variant="splitted">
                    {
                        Array.from(recapMap).map(([group, prices], index) => {
                            return (
                                <AccordionItem key={index}
                                               title={group}
                                               indicator={
                                                   ({isOpen}) => (
                                                       isOpen ? <ChevronRightIcon className="text-xl w-6"/> :
                                                           <Sales number={sum(prices) / 100}/>
                                                   )
                                               }>
                                    <PaiementsDetails prices={prices}/>
                                </AccordionItem>
                            )
                        })
                    }
                </Accordion>
            </div>
        </>
    );
}

export const Sales = ({number}: { number: any }) => (
    <div className="flex items-center gap-1 text-default-400">
        <span className="text-small">{number}</span>
        <span className="text-small">€</span>
        <ChevronRightIcon className="text-xl w-6"/>
    </div>
);