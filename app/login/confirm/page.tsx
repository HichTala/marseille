import {Button, Link } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
    return (
        <div className="w-full pt-2 items-center">
            <div className="flex">
                <Image className="z-10" src="/logo_seul.png" alt="Image logo" width="84" height="84"/>
                <div className="flex items-center w-48 md:w-48 z-10">
                    <Image src="/logo_clair.png" alt="Texte logo" width="200" height="36"
                           className="block dark:hidden"/>
                    <Image src="/logo_dark.png" alt="Texte logo" width="164" height="36" className="hidden dark:block"/>
                </div>
            </div>

            <div className="items-center justify-center w-full">
                <p className="font-bold mx-auto p-5 text-center">Continuez l'inscription en cliquant sur le lien envoyer par
                    mail</p>

                <div className="flex w-full items-center justify-center">
                    <Button
                        className="m-4 cursor-pointer"
                        href="/"
                        as={Link}
                        color="primary"
                        variant="solid"
                    >
                        Ok
                    </Button>
                </div>
            </div>
        </div>
    )
}