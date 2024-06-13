'use client'

import {Input} from "@nextui-org/react";
import {MailIcon} from "@nextui-org/shared-icons";
import {Button} from "@nextui-org/button";
import {Signout} from "@/app/ui/signout";

export function Profile({vacataire, user}:{vacataire : any | null, user: any | null}) {
    return (
        <div className="p-5">
            <div className="flex justify-between">
                <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente">
                    {vacataire?.at(0)['prenom']} {vacataire?.at(0)['nom']}
                </h1>
                <img src="https://i.imgur.com/tdi3NGa.png" alt="" className="h-10 w-10 flex-none rounded-full"/>
            </div>
            <div className="border-t-1 mt-2"/>
            <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente mt-2">
                Informations personnels
            </h1>

            <form className="p-2">
                <div className="mt-10">
                    <Input
                        type="email"
                        label="Email"
                        placeholder={user?.email}
                        labelPlacement="outside"
                        startContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                        }
                    />
                </div>
                <div className="flex mt-5 justify-end">
                    <button
                        type="submit"
                        className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
                    >
                        Valider
                    </button>
                </div>
            </form>
            <div className="border-t-1 mt-10"/>
            <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente mt-2">
                Déconnection
            </h1>
            <div className="flex mt-1 justify-end">
                <button
                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                    onClick={handleSignout}
                >
                    Se déconnecter
                </button>
            </div>
        </div>
    )
}

export function ProfilePiscine({piscine, user}:{piscine : any | null, user: any | null}) {
    return (
        <div className="p-5">
            <div className="flex justify-between">
                <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente">
                    {piscine?.at(0)['name']}
                </h1>
                <img src="https://i.imgur.com/tdi3NGa.png" alt="" className="h-10 w-10 flex-none rounded-full"/>
            </div>
            <div className="border-t-1 mt-2"/>
            <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente mt-2">
                Informations personnels
            </h1>

            <form className="p-2">
                <div className="mt-10">
                    <Input
                        type="email"
                        label="Email"
                        placeholder={user?.email}
                        labelPlacement="outside"
                        startContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                        }
                    />
                </div>
                <div className="flex mt-5 justify-end">
                    <button
                        type="submit"
                        className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
                    >
                        Valider
                    </button>
                </div>
            </form>
            <div className="border-t-1 mt-10"/>
            <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente mt-2">
                Déconnection
            </h1>
            <div className="flex mt-1 justify-end">
                <button
                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                    onClick={handleSignout}
                >
                    Se déconnecter
                </button>
            </div>
        </div>
    )
}

async function handleSignout() {
    await Signout()
}