'use client'

import {Input, Link} from "@nextui-org/react";
import {MailIcon} from "@nextui-org/shared-icons";
import {Button} from "@nextui-org/button";
import {Signout} from "@/app/ui/signout";
import {faPenToSquare, faPhone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export function Profile({vacataire, user, url_siren_siret, url_certificate, url_pse, url_insurance, url_pro_card}: {
    vacataire: any[] | null,
    user: any | null,
    url_siren_siret: string,
    url_certificate: string,
    url_pse: string,
    url_insurance: string,
    url_pro_card: string
}) {
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

            <form className="p-2 flex flex-col gap-4">
                <Input
                    type="email"
                    label="Email"
                    placeholder={user?.email}
                    labelPlacement="outside"
                    startContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                />
                <Input
                    type="tel"
                    label="Téléphone"
                    placeholder={vacataire?.at(0).phone}
                    labelPlacement="outside"
                    startContent={
                        <FontAwesomeIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0"
                                         icon={faPhone}/>
                    }
                />

                <Input
                    placeholder={vacataire?.at(0).address}
                    name="address"
                    label="Adresse"/>
                <div className="flex gap-3">
                    <Input
                        placeholder={vacataire?.at(0).city}
                        name="city"
                        label="Ville"/>
                    <div>
                        <Input
                            placeholder={vacataire?.at(0).postal}
                            name="postal"
                            label="Code Postal"
                            type="number"/>
                    </div>
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

            <div className="border-t-1 mt-2"/>
            <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente mt-2">
                Régime
            </h1>

            <form className="p-2 flex flex-col gap-4">
                <div className="flex items-end justify-between gap-5">
                    <Input
                        type="number"
                        label="SIREN/SIRET"
                        placeholder={vacataire?.at(0).siren_siret}
                        labelPlacement="outside"
                    />
                    <Link className="mb-2" showAnchorIcon href={url_siren_siret}>Justificatif</Link>
                    <FontAwesomeIcon className="mb-3 text-primary cursor-pointer" icon={faPenToSquare}/>
                </div>

                <Input
                    placeholder={vacataire?.at(0).tva}
                    name="tva"
                    label="Numéro de TVA"
                    type="number"/>


                <Input
                    placeholder={vacataire?.at(0).society_address}
                    name="society_address"
                    label="Adresse de la société"/>
                <div className="flex gap-3">
                    <Input
                        placeholder={vacataire?.at(0).society_city}
                        name="society_city"
                        label="Ville"/>
                    <div>
                        <Input
                            placeholder={vacataire?.at(0).society_postal}
                            name="postal"
                            label="Code Postal"
                            type="number"/>
                    </div>
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

            <div className="border-t-1 mt-2"/>
            <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente mt-2">
                Diplôme
            </h1>

            <form className="p-2 flex flex-col gap-4">
                <div className="flex items-end justify-between gap-5">
                    <Link className="mb-2" showAnchorIcon href={url_certificate}>Diplôme {vacataire?.at(0).certificate}</Link>
                    <FontAwesomeIcon className="mb-2 text-primary cursor-pointer" icon={faPenToSquare}/>
                </div>
                <div className="flex items-end justify-between gap-5">
                    <Link className="mb-2" showAnchorIcon href={url_pse}>Diplôme PSE</Link>
                    <FontAwesomeIcon className="mb-3 text-primary cursor-pointer" icon={faPenToSquare}/>
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

            <div className="border-t-1 mt-2"/>
            <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente mt-2">
                Assurance professionnelle
            </h1>

            <form className="p-2 flex flex-col gap-4">
                <div className="flex items-end justify-between gap-5">
                    <Link className="mb-2" showAnchorIcon href={url_insurance}>Assurance professionnelle</Link>
                    <FontAwesomeIcon className="mb-3 text-primary cursor-pointer" icon={faPenToSquare}/>
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

            <div className="border-t-1 mt-2"/>
            <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente mt-2">
                Carte professionnelle ou déclaration d’activité
            </h1>

            <form className="p-2 flex flex-col gap-4">
                <div className="flex items-end justify-between gap-5">
                    <Link className="mb-2" showAnchorIcon href={url_pro_card}>Carte professionnelle</Link>
                    <FontAwesomeIcon className="mb-3 text-primary cursor-pointer" icon={faPenToSquare}/>
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

export function ProfilePiscine({piscine, user, url_siren_siret, url_insurance, url_pro_card}: {
    piscine: any | null,
    user: any | null,
    url_siren_siret: string,
    url_insurance: string,
    url_pro_card: string
}) {
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

            <form className="p-2 flex flex-col gap-4">
                <Input
                    type="email"
                    label="Email"
                    placeholder={user?.email}
                    labelPlacement="outside"
                    startContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                    }
                />

                <Input
                    placeholder={piscine?.at(0).address}
                    name="address"
                    labelPlacement="outside"
                    label="Adresse"/>
                <div className="flex gap-3">
                    <Input
                        placeholder={piscine?.at(0).city}
                        labelPlacement="outside"
                        name="city"
                        label="Ville"/>
                    <div>
                        <Input
                            placeholder={piscine?.at(0).postal}
                            name="postal"
                            labelPlacement="outside"
                            label="Code Postal"
                            type="number"/>
                    </div>
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

            <div className="border-t-1 mt-2"/>
            <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente mt-2">
                Régime
            </h1>

            <form className="p-2 flex flex-col gap-4">
                <div className="flex items-end justify-between gap-5">
                    <Input
                        type="number"
                        label="SIREN/SIRET"
                        placeholder={piscine?.at(0).siren_siret}
                        labelPlacement="outside"
                    />
                    <Link className="mb-2" showAnchorIcon href={url_siren_siret}>Justificatif</Link>
                    <FontAwesomeIcon className="mb-3 text-primary cursor-pointer" icon={faPenToSquare}/>
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

            <div className="border-t-1 mt-2"/>
            <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente mt-2">
                Assurance professionnelle
            </h1>

            <form className="p-2 flex flex-col gap-4">
                <div className="flex items-end justify-between gap-5">
                    <Link className="mb-2" showAnchorIcon href={url_insurance}>Assurance professionnelle</Link>
                    <FontAwesomeIcon className="mb-2 text-primary cursor-pointer" icon={faPenToSquare}/>
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

            <div className="border-t-1 mt-2"/>
            <h1 className="text-2xl font-black md:font-extrabold font-sans text-cente mt-2">
                Carte professionnelle ou déclaration d’activité
            </h1>

            <form className="p-2 flex flex-col gap-4">
                <div className="flex items-end justify-between gap-5">
                    <Link className="mb-2" showAnchorIcon href={url_pro_card}>Carte professionnelle</Link>
                    <FontAwesomeIcon className="mb-2 text-primary cursor-pointer" icon={faPenToSquare}/>
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