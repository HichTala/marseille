'use client'

import {Listbox, ListboxItem} from "@nextui-org/react";
import {ChevronRightIcon} from "@heroicons/react/20/solid";
import {usePress} from "@react-aria/interactions";
import React from "react";

export function AnnualTotal() {
    return (
        <div
            className="w-[180px] h-[120px] rounded-full pt-5 mt-12 border-8 border-customblue grid justify-items-center">
            <p>Total annuel:</p>
            <p> 9587 €</p>
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
                            <div className="bg-customblue w-6 h-14 rounded-lg hover:bg-customblue"/>
                        </div>
                        <p className="month text-customblue font-bold">Mai</p>
                    </div>
                    <div className="mr-5">
                        <div className="flex w-full justify-center">
                            <div className="bg-gray-300 w-6 h-1 rounded-lg hover:bg-customblue"/>
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
                    {/*<div className="mr-5 selected font-bold text-customblue dark:text-customwhite">*/}
                    {/*    <div className="bar h-25"></div>*/}
                    {/*    <p className="month">Avr</p>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}

export function DetailsFacturation() {

    // let [events, setEvents] = React.useState([]);
    // let {pressProps, isPressed} = usePress({
    //     onPressStart: (e) =>
    //         setEvents(
    //             (events) => [...events, `press start with ${e.pointerType}`]
    //         ),
    //     onPressEnd: (e) =>
    //         setEvents(
    //             (events) => [...events, `press end with ${e.pointerType}`]
    //         ),
    //     onPress: (e) =>
    //         setEvents(
    //             (events) => [...events, `press with ${e.pointerType}`]
    //         )
    // });

    return (

        <div className="w-full mt-10">
            <h1 className="text-xl font-black textfont-sans text-cente mb-1">Détail</h1>
            <Listbox
                aria-label="User Menu"
                onAction={(key) => alert(key)}
                className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
                itemClasses={{
                    base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                }}
            >
                <ListboxItem
                    key="prestalis"
                    endContent={<Sales number={240}/>}
                >
                    Prestalis
                </ListboxItem>
                <ListboxItem
                    key="vert-marine"
                    endContent={<Sales number={500}/>}
                >
                    Vert Marine
                </ListboxItem>
                <ListboxItem
                    key="etc"
                    endContent={<Sales number={240}/>}
                >
                    etc
                </ListboxItem>

            </Listbox>
        </div>


        // <div className="w-full max-w-[600px] border-2 border-gray-300 rounded-full overflow-hidden">
        //     <div
        //         className="flex justify-between w-full p-5 border-gray-300 hover:dark:bg-gray-700 cursor-pointer px-16 hover:bg-gray-300">
        //         <p>Prestalis</p>
        //         <p>240 €</p>
        //     </div>
        //     <div className="flex justify-between w-full p-5 border-t-2 border-gray-300 hover:dark:bg-gray-700 cursor-pointer px-16 hover:bg-gray-300">
        //         <p>Vert Marine</p>
        //         <p>500 €</p>
        //     </div>
        //     <div className="flex justify-between w-full p-5 border-t-2 border-gray-300 hover:dark:bg-gray-700 cursor-pointer px-16 hover:bg-gray-300">
        //         <p>ETC</p>
        //         <p>240 €</p>
        //     </div>
        // </div>
    );
}

export const Sales = ({number}: { number: any }) => (
    <div className="flex items-center gap-1 text-default-400">
        <span className="text-small">{number}</span>
        <span className="text-small">€</span>
        <ChevronRightIcon className="text-xl w-6"/>
    </div>
);