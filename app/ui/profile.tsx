'use client'

import {Input} from "@nextui-org/react";
import {MailIcon} from "@nextui-org/shared-icons";
import {Button} from "@nextui-org/button";
import {Signout} from "@/app/vacataire/profile/page";

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
                        id="email"
                        type="email"
                        label="Email"
                        placeholder={user?.email}
                        labelPlacement="outside"
                        startContent={
                            <svg
                                className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                                aria-hidden="true"
                                fill="none"
                                focusable="false"
                                height="1em"
                                role="presentation"
                                viewBox="0 0 24 24"
                                width="1em"
                            >
                                <path
                                    d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.31 12.62 9.66 12.09L6.53 9.59C6.21 9.33 6.16 8.85 6.41 8.53C6.67 8.21 7.14 8.15 7.46 8.41L10.59 10.91C11.35 11.52 12.64 11.52 13.4 10.91L16.53 8.41C16.85 8.15 17.33 8.2 17.58 8.53C17.84 8.85 17.79 9.33 17.47 9.59Z"
                                    fill="currentColor"
                                />
                            </svg>
                        }
                    />
                </div>
                <div className="mt-10   ">
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
                    // onClick={handleSignout}
                >
                    Se déconnecter
                </button>
            </div>
            <div className="flex mt-1 justify-end">
                <Button color="danger" variant="bordered">
                    Se déconnecter
                </Button>
            </div>
        </div>
    )
}

// async function handleSignout() {
//     await Signout()
// }