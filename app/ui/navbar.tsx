'use client'

import Image from "next/image";
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

export function Navbar({corresponding_page}: { corresponding_page: String }) {
    let color_dict = {
        "offres": "dark:text-beige hover:text-darkblue dark:hover:text-customwhite",
        "propositions": "dark:text-beige hover:text-darkblue dark:hover:text-customwhite",
        "missions": "dark:text-beige hover:text-darkblue dark:hover:text-customwhite",
        "paiements": "dark:text-beige hover:text-darkblue dark:hover:text-customwhite",
        "profile": "dark:text-beige hover:text-darkblue dark:hover:text-customwhite"
    }
    color_dict[corresponding_page as keyof typeof color_dict] = "text-darkblue md:dark:text-customwhite"

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex justify-between">
            <Image className="z-10" src="/logo_seul.png" alt="Image logo" width="84" height="84"/>
            <div className="flex items-center w-48 md:w-48 z-10">
                <Image src="/logo_clair.png" alt="Texte logo" width="200" height="36"
                       className="block dark:hidden"/>
                <Image src="/logo_dark.png" alt="Texte logo" width="164" height="36" className="hidden dark:block"/>
            </div>
            <div
                className="flex items-center text-3xl cursor-pointer ml-auto mr-0 w-full justify-end text-customblue dark:text-beige pr-2 z-10"
                onClick={toggleMenu}>
                {isOpen ? (
                    <FontAwesomeIcon name="menu" className="md:hidden" icon={faXmark}/>
                ) : (
                    <FontAwesomeIcon name="menu" className="md:hidden" icon={faBars}/>
                )}
            </div>

            <div className="flex flex-1 items-center">
                <ul className={`px-2 text-gray-400 font-bold text-xs mr-0 ml-auto md:flex md:items-center absolute md:static bg-white w-full left-0 pl-7 pt-56 md:bg-background md:w-auto md:pl-0 md:pt-0 md:right-0 ${isOpen ? ("opacity-100 translate-y") : ("opacity-0 translate-y-[-40px] pointer-events-none")} md:translate-y-0 md:opacity-100 transition-all ease-in duration-500}`}>
                    <li className={`my-2 md:my-0 px-2 ${color_dict["offres"]}`}><a href="/vacataire/offres">OFFRES</a>
                    </li>
                    <li className={`my-2 md:my-0 px-2 ${color_dict["propositions"]}`}><a
                        href="/vacataire/propositions?page=1&state=0%2C1">PROPOSITIONS</a></li>
                    <li className={`my-2 md:my-0 px-2 ${color_dict["missions"]}`}><a
                        href="/vacataire/missions">MISSIONS</a></li>
                    <li className={`my-2 md:my-0 px-2 ${color_dict["paiements"]}`}><a
                        href="/vacataire/paiements">PAIEMENTS</a></li>
                    <li className={`my-2 md:my-0 px-2 ${color_dict["profile"]}`}><a
                        href="/vacataire/profile">PROFILE</a></li>
                </ul>
            </div>
        </div>
    );
}

export function NavbarPiscine({corresponding_page}: { corresponding_page: String }) {
    let color_dict = {
        "planning": "dark:text-beige hover:text-darkblue dark:hover:text-customwhite",
        "validation": "dark:text-beige hover:text-darkblue dark:hover:text-customwhite",
        "profile": "dark:text-beige hover:text-darkblue dark:hover:text-customwhite",
        "paiements": "dark:text-beige hover:text-darkblue dark:hover:text-customwhite",
    }
    color_dict[corresponding_page as keyof typeof color_dict] = "text-darkblue md:  dark:text-customwhite"

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex justify-between">
            <Image className="z-20" src="/logo_seul.png" alt="Image logo" width="84" height="84"/>
            <div className="flex items-center w-48 md:w-48 z-20">
                <Image src="/logo_clair.png" alt="Texte logo" width="200" height="36"
                       className="block dark:hidden"/>
                <Image src="/logo_dark.png" alt="Texte logo" width="164" height="36" className="hidden dark:block"/>
            </div>
            <div
                className="flex items-center text-3xl cursor-pointer ml-auto mr-0 w-full justify-end text-customblue dark:text-beige pr-2 z-20"
                onClick={toggleMenu}>
                {isOpen ? (
                    <FontAwesomeIcon name="menu" className="md:hidden" icon={faXmark}/>
                ) : (
                    <FontAwesomeIcon name="menu" className="md:hidden" icon={faBars}/>
                )}
            </div>

            <div className="flex flex-1 items-center">
                <ul className={`z-10 px-2 text-gray-400 font-bold text-xs mr-0 ml-auto md:flex md:items-center absolute md:static bg-white w-full left-0 pl-7 pt-56 md:bg-background md:w-auto md:pl-0 md:pt-0 md:right-0 ${isOpen ? ("opacity-100 translate-y") : ("opacity-0 translate-y-[-40px] pointer-events-none")} md:translate-y-0 md:opacity-100 transition-all ease-in duration-500`}>
                    <li className={`my-2 md:my-0 px-2 ${color_dict["planning"]}`}><a href="/piscine/jobs">PLANNING</a>
                    </li>
                    <li className={`my-2 md:my-0 px-2 ${color_dict["validation"]}`}><a
                        href="/piscine/validation?state=1%2C5&page=1">VALIDATION</a></li>
                    <li className={`my-2 md:my-0 px-2 ${color_dict["paiements"]}`}><a
                        href="/piscine/paiements">PAIEMENTS</a></li>
                    <li className={`my-2 md:my-0 px-2 ${color_dict["profile"]}`}><a href="/piscine/profile">PROFILE</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}