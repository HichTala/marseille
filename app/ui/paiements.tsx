'use client'

import {
    Accordion,
    AccordionItem, Link,
    Listbox,
    ListboxItem,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {usePress} from "@react-aria/interactions";
import React, {useEffect, useState} from "react";
import {getMissions, getMissionsPaiements, getMissionsPaiementsPiscine} from "@/app/ui/get-mission";
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

export function SalesPerMounth() {
    return (
        <div className="flex m-2 justify-center items-center">
            <div className="main-container items-center text-darkblue dark:text-beige max-w-[300px] md:max-w-none">
                <div className="flex overflow-x-auto m-auto items-end">
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-gray-300 w-6 h-16 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month">Jan</p>
                    </div>
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-gray-300 w-6 h-36 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month">Fev</p>
                    </div>
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-gray-300 w-6 h-32 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month">Mar</p>
                    </div>
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-gray-300 w-6 h-28 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month">Avr</p>
                    </div>
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-gray-300 w-6 h-14 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month">Mai</p>
                    </div>
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-customblue w-6 h-1 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month">Jui</p>
                    </div>
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-gray-300 w-6 h-32 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month">Jui</p>
                    </div>
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-gray-300 w-6 h-16 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month">Aou</p>
                    </div>
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-gray-300 w-6 h-3 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month">Sep</p>
                    </div>
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-gray-300 w-6 h-8 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month">Oct</p>
                    </div>
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-gray-300 w-6 h-12 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month">Nov</p>
                    </div>
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-gray-300 w-6 h-24 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month">Dec</p>
                    </div>
                </div>
            </div>
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
            <AnnualTotal total={total/100}/>

            <div className="hidden bg-gray-300 bg-customblue h-[0%] h-[1%] h-[2%] h-[3%] h-[4%] h-[5%] h-[6%] h-[7%] h-[8%] h-[9%] h-[10%] h-[11%] h-[12%] h-[13%] h-[14%] h-[15%] h-[16%] h-[17%] h-[18%] h-[19%] h-[20%] h-[21%] h-[22%] h-[23%] h-[24%] h-[25%] h-[26%] h-[27%] h-[28%] h-[29%] h-[30%] h-[31%] h-[32%] h-[33%] h-[34%] h-[35%] h-[36%] h-[37%] h-[38%] h-[39%] h-[40%] h-[41%] h-[42%] h-[43%] h-[44%] h-[45%] h-[46%] h-[47%] h-[48%] h-[49%] h-[50%] h-[51%] h-[52%] h-[53%] h-[54%] h-[55%] h-[56%] h-[57%] h-[58%] h-[59%] h-[60%] h-[61%] h-[62%] h-[63%] h-[64%] h-[65%] h-[66%] h-[67%] h-[68%] h-[69%] h-[70%] h-[71%] h-[72%] h-[73%] h-[74%] h-[75%] h-[76%] h-[77%] h-[78%] h-[79%] h-[80%] h-[81%] h-[82%] h-[83%] h-[84%] h-[85%] h-[86%] h-[87%] h-[88%] h-[89%] h-[90%] h-[91%] h-[92%] h-[93%] h-[94%] h-[95%] h-[96%] h-[97%] h-[98%] h-[99%] h-[100%]" />

            <div className="flex m-2 justify-center items-center">
                <div className="main-container mt-5 items-center text-darkblue dark:text-beige max-w-[300px] md:max-w-none">
                    <div className="flex overflow-x-auto m-auto items-end">
                        {
                            mounths.map((mounth, index) => (
                                <button onClick={() => handleMonthSelection(index)}>
                                    <div className="mr-5">
                                        <div className="flex w-full h-[128px] justify-center items-end">
                                            <div
                                                className={`${index == selectedMounth ? "bg-customblue" : "bg-gray-300"} w-6 h-[${Math.trunc(mounth_sum(recaps[index]) * 99 / max) + 1}%] rounded-lg hover:bg-customblue`}/>
                                        </div>
                                        <p className={index == selectedMounth ? "text-customblue font-bold" : ""}>{mounth}</p>
                                    </div>
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

export function DetailsFacturationPiscine() {

    const [recaps, setRecaps] = useState<PiscineRecap[]>([]);
    const [selectedMounth, setSelectedMounth] = useState((new Date()).getMonth());

    useEffect(() => {
        const fetchMission = async () => {
            try {
                const result = await getMissionsPaiementsPiscine();
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
        let mSum = sum(recap)
        total += mSum
        if (mSum > max) {
            max = mSum
        }
    })

    const handleMonthSelection = (index: number) => {
        setSelectedMounth(index)
    }

    const recapMap = recaps[selectedMounth] ? new Map<string, number>(Object.entries(recaps[selectedMounth])) : new Map<string, number>()


    const mounths = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec']

    mounths.map((mounth, index) => {
        // console.log(mounth, `${index == selectedMounth ? "bg-customblue" : "bg-gray-300"} w-6 h-[${Math.trunc(mounth_sum(recaps[index]) * 99 / max) + 1}%] rounded-lg hover:bg-customblue`)
    })

    return (
        <>
            <AnnualTotal total={total/100}/>

            <div className="hidden bg-gray-300 bg-customblue h-[0%] h-[1%] h-[2%] h-[3%] h-[4%] h-[5%] h-[6%] h-[7%] h-[8%] h-[9%] h-[10%] h-[11%] h-[12%] h-[13%] h-[14%] h-[15%] h-[16%] h-[17%] h-[18%] h-[19%] h-[20%] h-[21%] h-[22%] h-[23%] h-[24%] h-[25%] h-[26%] h-[27%] h-[28%] h-[29%] h-[30%] h-[31%] h-[32%] h-[33%] h-[34%] h-[35%] h-[36%] h-[37%] h-[38%] h-[39%] h-[40%] h-[41%] h-[42%] h-[43%] h-[44%] h-[45%] h-[46%] h-[47%] h-[48%] h-[49%] h-[50%] h-[51%] h-[52%] h-[53%] h-[54%] h-[55%] h-[56%] h-[57%] h-[58%] h-[59%] h-[60%] h-[61%] h-[62%] h-[63%] h-[64%] h-[65%] h-[66%] h-[67%] h-[68%] h-[69%] h-[70%] h-[71%] h-[72%] h-[73%] h-[74%] h-[75%] h-[76%] h-[77%] h-[78%] h-[79%] h-[80%] h-[81%] h-[82%] h-[83%] h-[84%] h-[85%] h-[86%] h-[87%] h-[88%] h-[89%] h-[90%] h-[91%] h-[92%] h-[93%] h-[94%] h-[95%] h-[96%] h-[97%] h-[98%] h-[99%] h-[100%]" />

            <div className="flex m-2 justify-center items-center">
                <div className="main-container mt-5 items-center text-darkblue dark:text-beige max-w-[300px] md:max-w-none">
                    <div className="flex overflow-x-auto m-auto items-end">
                        {
                            mounths.map((mounth, index) => (
                                <button onClick={() => handleMonthSelection(index)}>
                                    <div className="mr-5">
                                        <div className="flex w-full h-[128px] justify-center items-end">
                                            <div
                                                className={`${index == selectedMounth ? "bg-customblue" : "bg-gray-300"} w-6 h-[${Math.trunc(sum(recaps[index]) * 99 / max) + 1}%] rounded-lg hover:bg-customblue`}/>
                                        </div>
                                        <p className={index == selectedMounth ? "text-customblue font-bold" : ""}>{mounth}</p>
                                    </div>
                                </button>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className="w-full mt-10">
                <h1 className="text-xl font-black textfont-sans text-cente mb-1">Détail</h1>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>NOM</TableColumn>
                        <TableColumn>FACTURE</TableColumn>
                        <TableColumn>TOTAL</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {
                            Array.from(recapMap).map(([name, price], index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{name}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-center">
                                                <Link href="#" showAnchorIcon></Link>
                                            </div>
                                        </TableCell>
                                        <TableCell className="flex">
                                            <p className="font-semibold text-default-400 text-small">{price / 100}</p>
                                            <p className=" text-default-400 text-small">€</p>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    );
}