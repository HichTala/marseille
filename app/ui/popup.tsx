"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Suspense, useState} from "react";
import Search, {DatePicker, List} from "@/app/ui/search";

export function PopupFiltreVacation() {

    const [popupOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!popupOpen);
    };

    return (
        <div className="w-full grid justify-items-center">
            <div className="z-10 absolute mt-4 md:mt-8 space-x-5 grid justify-items-center m-2">
                {
                    popupOpen
                    &&
                    <div
                        className="bg-white dark:bg-popupblue rounded-3xl shadow-2xl p-8">
                        <div className="w-full flex justify-end">
                            <FontAwesomeIcon className="cursor-pointer text-customblue font-bold dark:text-customwhite"
                                             icon={faXmark} onClick={togglePopup}/>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-black md:font-extrabold font-sans text-cente mb-5">
                            Filtrer les vacations
                        </h1>
                        <div
                            className="bg-white rounded-full border-solid border-gray-200 border-2 overflow-hidden dark:bg-gray-700 dark:border-gray-600">
                            <Suspense>
                                <Search placeholder="Rechercher piscine"/>
                                <List placeholder="Diplômes" list="fonction" name="certificate"/>
                                <DatePicker/>
                            </Suspense>
                        </div>
                        <div className="flex justify-center pt-4 pb-2">
                            <button onClick={togglePopup}
                                className="font-bold rounded-2xl border-solid border-customwhite text-customwhite bg-customblue px-8 py-2">Ok
                            </button>
                        </div>
                    </div>
                }
            </div>
            <div className="w-full flex justify-center" onClick={togglePopup}>
                <div
                    className="w-full cursor-pointer max-w-[400px] bg-white h-[70px] md:h-[80px] flex items-center justify-between rounded-full mt-5 border-8 border-customturquoise hover:border-customblue shadow-md">
                    <p className="text-darkblue px-5">Filtrer les offres</p>
                    <div
                        className="text-customwhite font-bold text-xl mx-3 py-2 px-3 bg-customturquoise hover:bg-customblue rounded-2xl">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function PopupFiltreProposition() {

    const [popupOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!popupOpen);
    };

    return (
        <div className="w-full grid justify-items-center">
            <div className="z-10 absolute mt-4 md:mt-8 space-x-5 grid justify-items-center m-2">
                {
                    popupOpen
                    &&
                    <div
                        className="bg-white dark:bg-popupblue rounded-3xl shadow-2xl p-8">
                        <div className="w-full flex justify-end">
                            <FontAwesomeIcon className="cursor-pointer text-customblue font-bold dark:text-customwhite"
                                             icon={faXmark} onClick={togglePopup}/>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-black md:font-extrabold font-sans text-cente mb-5">
                            Filtrer les propositions
                        </h1>
                        <div
                            className="bg-white rounded-full border-solid border-gray-200 border-2 overflow-hidden dark:bg-gray-700 dark:border-gray-600">
                            <Suspense>
                                <Search placeholder="Rechercher piscine"/>
                                <DatePicker/>
                            </Suspense>
                        </div>
                        <div className="flex justify-center pt-4 pb-2">
                            <button onClick={togglePopup}
                                    className="font-bold rounded-2xl border-solid border-customwhite text-customwhite bg-customblue px-8 py-2">Ok
                            </button>
                        </div>
                    </div>
                }
            </div>
            <div className="w-full flex justify-center" onClick={togglePopup}>
                <div
                    className="w-full cursor-pointer max-w-[400px] bg-white h-[70px] md:h-[80px] flex items-center justify-between rounded-full mt-5 border-8 border-customturquoise hover:border-customblue shadow-md">
                    <p className="text-darkblue px-5">Filtrer les propositions</p>
                    <div
                        className="text-customwhite font-bold text-xl mx-3 py-2 px-3 bg-customturquoise hover:bg-customblue rounded-2xl">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </div>
                </div>
            </div>
        </div>
    );
}