'use client'

import {useFormState} from "react-dom";
import {createMission, createOffer, StateMission, StateOffer} from "@/app/lib/actions";
import {
    Card,
    CardBody,
    Checkbox,
    DatePicker,
    Input, Link,
    Modal, ModalBody,
    ModalContent, ModalFooter, ModalHeader,
    Select,
    SelectItem,
    Textarea,
    TimeInput
} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {format} from "date-fns";
import {getLocalTimeZone, today} from "@internationalized/date";
import {ClockCircleLinearIcon} from "@nextui-org/shared-icons";
import {Button} from "@nextui-org/button";

export function OfferForm({
                              offer
                          }: {
    offer: any
}) {
    const initialState = {message: null, errors: {}};
    const [state, dispatch] = useFormState<StateMission, FormData>(createMission, initialState)

    const date = new Date(Date.now());


    return (
        <form id="formData" className="pt-4" action={dispatch}>
            <input className="hidden" type="text" value={offer.id} name="offer_id"/>
            <div className="flex">
                <Checkbox name="contract">J'ai pris connaissance de blabalbal</Checkbox>
            </div>
            <div>
                {state.errors?.contract &&
                    state.errors.contract.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500 w-full overflow-scroll" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <p className="text-darkblue dark:text-customwhite font-extrabold text-xl pt-4 mb-4">Prix (HT)</p>
            <Input
                name="price"
                type="number"
                placeholder="0.00"
                startContent={
                    <div className="pointer-events-none flex items-center">
                        <span className="text-default-400 text-small">€</span>
                    </div>
                }
            />
            <div>
                {state.errors?.price &&
                    state.errors.price.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <p className="mt-8 text-sm">MONTANT TOTAL DE LA MISSION</p>
            <p className="text-sm">(Nb heures x Prix Horaire)</p>

            <p className="text-darkblue dark:text-customwhite font-extrabold text-xl pt-4">Commentaire</p>

            <Textarea
                name="comment"
            />

            <p className="text-darkblue dark:text-customwhite font-extrabold text-xl pt-4">Signature</p>

            <div className="pt-2 flex">
                <p className="pr-5">Le {format(date, 'dd/MM/yyyy à HH:mm')}</p>
            </div>
            <div className="flex pt-5 justify-end">
                <button type="submit"
                        className="bg-customblue rounded-xl px-4 py-2 mb-2 text-white">
                    Postuler
                </button>
            </div>
        </form>
    )
}

export function PostForm() {
    const initialState = {message: null, errors: {}};
    const [state, dispatch] = useFormState<StateOffer, FormData>(createOffer, initialState)

    const certificates = [
        {key: 'BNSSA', label: 'BNSSA'},
        {key: 'MNS', label: 'MNS'},
    ]

    return (
        <form id="formData" className="pt-4" action={dispatch}>
            <div className="flex">
                <DatePicker
                    name="date"
                    labelPlacement="outside"
                    label="Date"
                    isRequired={true}
                    minValue={today(getLocalTimeZone())}
                    className="max-w-[284px] w-3/5 m-1"
                />
                <Input
                    name="nb_vacataire"
                    labelPlacement="outside"
                    type="number"
                    label="Nbr vacataire"
                    isRequired={true}
                    defaultValue="1"
                    className="w-2/5 m-1 text-right"
                />
            </div>
            <div className="flex">
                <TimeInput
                    name="start"
                    labelPlacement="outside"
                    className="mx-1 mt-6"
                    label="Heure début"
                    isRequired={true}
                    endContent={(
                        <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0"/>
                    )}
                />
                <TimeInput
                    name="end"
                    labelPlacement="outside"
                    className="mx-1 mt-6"
                    label="Heure Fin"
                    isRequired={true}
                    endContent={(
                        <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0"/>
                    )}
                />
                <TimeInput
                    name="duration"
                    labelPlacement="outside"
                    className="mx-1 mt-6"
                    label="Durée"
                    isRequired={true}
                    endContent={(
                        <ClockCircleLinearIcon className="text-xl text-default-400 pointer-events-none flex-shrink-0"/>
                    )}
                />
            </div>
            <div className="flex mt-8">
                <Input
                    name="supervisor"
                    labelPlacement="outside"
                    className="mx-1"
                    label="Superviseur"
                />
                <Select
                    isRequired
                    name="certificate"
                    labelPlacement="outside"
                    className="mx-1"
                    label="Diplôme"
                >
                    {certificates.map((certificate) => (
                        <SelectItem key={certificate.key}>
                            {certificate.label}
                        </SelectItem>
                    ))}
                </Select>

            </div>
            <Textarea
                name="description"
                labelPlacement="outside"
                label="Description"
                className="max-w-xs mt-6"
            />

            <div className="flex pt-5 justify-end">
                <Button
                    type="submit"
                    color="primary"
                    className="px-4 py-2 mb-2"
                >
                    Poster
                </Button>
            </div>
        </form>
    )
}

function PopupRecapOffer() {

    const [popupOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!popupOpen);
    };

    console.log(popupOpen)

    return (
        <div>
            <div className="w-full grid justify-items-center">
                <Modal className="m-auto" backdrop={"blur"} isOpen={popupOpen} onClose={togglePopup}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Filtrer les propositions</ModalHeader>
                                <ModalBody>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onPress={onClose}>
                                        Ok
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            <div className="flex pt-5 justify-end">
                <Button
                    type="submit"
                    color="primary"
                    className="px-4 py-2 mb-2"
                    onClick={togglePopup}
                >
                    Poster
                </Button>
            </div>
        </div>
    )
}

export function RegisterForm({
                                 searchParams,
                                 save
                             }: {
    searchParams: {
        message: string,
        postal: string,
        society_postal: string,
        phone: string,
        siren_siret: string,
        certificate: string,
        pse: string,
        pro_insurance: string,
        pro_card: string,

    },
    save: (formData: FormData) => Promise<never>,
}) {

    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<FormData | null>(null);

    const handleSave = async (data: FormData) => {
        setFormData(data);
        setIsLoading(true);
    }

    useEffect(() => {
        const saveData = async () => {
            if (isLoading && formData) {
                try {
                    await save(formData); // Replace with your actual save function
                } catch (error) {
                    console.error('An error occurred:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        saveData();
    }, [isLoading, formData]);

    return (
        <Card className="px-3 pt-3 pb-8 m-5">
            <CardBody className="overflow-hidden">
                <form className="flex flex-col gap-4" action={handleSave}>
                    <p className="font-extrabold text-xl text-darkblue mx-3">Infos personnelles</p>
                    <div className="flex gap-3">
                        <Input isRequired name="nom" label="Nom"/>
                        <Input isRequired name="prenom" label="Prenom"/>
                    </div>

                    <Input isRequired name="phone" label="Téléphone" type="tel"/>
                    {searchParams?.phone && (
                        <p className="text-red-500 text-center text-xs">
                            {searchParams.phone}
                        </p>
                    )}

                    <Input isRequired name="address" label="Adresse"/>
                    <div className="flex gap-3">
                        <Input isRequired name="city" label="Ville"/>
                        <div>
                            <Input isRequired name="postal" label="Code Postal" type="number"/>
                            {searchParams?.postal && (
                                <p className="text-red-500 text-center text-xs">
                                    {searchParams.postal}
                                </p>
                            )}
                        </div>
                    </div>

                    <p className="font-extrabold text-xl text-darkblue mx-3">Régime</p>

                    <span className="mx-3 text-xs text-gray-700">Pour pouvoir travaille ril faut une auto entreprise blabla,</span>
                    <span className="mx-3 text-xs text-gray-700">Vous pouvez vous inscrire sur impotsgouv.fr</span>
                    <Link showAnchorIcon href="https://www.impots.gouv.fr/accueil">impots.gouv.fr</Link>

                    <Input isRequired name="siren_siret" label="SIREN/SIRET" type="number"/>

                    <label className="block">
                        <div className="flex">
                            <span className="text-xs text-gray-700 ml-3 mb-2">Justificatif</span> <p
                            className="text-red-500 text-xs ml-0.5">*</p>
                        </div>
                        <input type="file" name="file_siren_siret" className="block w-full text-sm text-gray-500
                            file:me-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700
                            file:disabled:opacity-50 file:disabled:pointer-events-none
                            dark:text-neutral-500
                            dark:file:bg-blue-500
                            dark:hover:file:bg-blue-400
                          "/>
                        {searchParams?.siren_siret && (
                            <p className="text-red-500 text-center text-sm">
                                {searchParams.siren_siret}
                            </p>
                        )}
                    </label>

                    <Input name="tva" label="Numéro de TVA (optionnel)" type="number"/>

                    <Input isRequired name="society_address" label="Adresse de la société"/>
                    <div className="flex gap-3">
                        <Input isRequired name="society_city" label="Ville"/>
                        <div>
                            <Input isRequired name="society_postal" label="Code Postal" type="number"/>
                            {searchParams?.society_postal && (
                                <p className="text-red-500 text-center text-xs">
                                    {searchParams.society_postal}
                                </p>
                            )}
                        </div>

                    </div>

                    <p className="font-extrabold text-xl text-darkblue mx-3">Diplômes</p>

                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <Select
                            isRequired
                            name="certificate"
                            label="Qualification"
                        >
                            <SelectItem key="BNSSA">
                                BNSSA
                            </SelectItem>
                            <SelectItem key="MNS">
                                MNS
                            </SelectItem>
                        </Select>
                    </div>

                    <label className="block">
                        <div className="flex">
                            <span className="text-sm mb-2">Justificatif</span> <p
                            className="text-red-500 text-xs ml-0.5">*</p>
                        </div>
                        <input type="file" name="file_certificate" className="block w-full text-sm text-gray-500
                            file:me-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700
                            file:disabled:opacity-50 file:disabled:pointer-events-none
                            dark:text-neutral-500
                            dark:file:bg-blue-500
                            dark:hover:file:bg-blue-400
                          "/>
                        {searchParams?.certificate && (
                            <p className="text-red-500 text-center text-sm">
                                {searchParams.certificate}
                            </p>
                        )}
                    </label>

                    <label className="block">
                        <div className="flex">
                            <span className="text-sm mb-2">Justificatif PSE1 ou PSE2</span> <p
                            className="text-red-500 text-xs ml-0.5">*</p>
                        </div>
                        <input type="file" name="file_pse" className="block w-full text-sm text-gray-500
                            file:me-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700
                            file:disabled:opacity-50 file:disabled:pointer-events-none
                            dark:text-neutral-500
                            dark:file:bg-blue-500
                            dark:hover:file:bg-blue-400
                          "/>
                        {searchParams?.pse && (
                            <p className="text-red-500 text-center text-sm">
                                {searchParams.pse}
                            </p>
                        )}
                    </label>

                    <p className="font-extrabold text-xl text-darkblue mx-3">Assurance professionnelle</p>

                    <label className="block">
                        <div className="flex">
                            <span className="text-sm mb-2">Justificatif</span> <p
                            className="text-red-500 text-xs ml-0.5">*</p>
                        </div>
                        <input type="file" name="file_insurance" className="block w-full text-sm text-gray-500
                            file:me-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700
                            file:disabled:opacity-50 file:disabled:pointer-events-none
                            dark:text-neutral-500
                            dark:file:bg-blue-500
                            dark:hover:file:bg-blue-400
                          "/>
                        {searchParams?.pro_insurance && (
                            <p className="text-red-500 text-center text-sm">
                                {searchParams.pro_insurance}
                            </p>
                        )}
                    </label>

                    <p className="font-extrabold text-xl text-darkblue mx-3">Carte professionnelle ou déclaration
                        d’activité</p>

                    <label className="block">
                        <div className="flex">
                            <span className="text-sm mb-2">Justificatif</span> <p
                            className="text-red-500 text-xs ml-0.5">*</p>
                        </div>
                        <input type="file" name="file_pro_card" className="block w-full text-sm text-gray-500
                            file:me-4 file:py-2 file:px-4
                            file:rounded-lg file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700
                            file:disabled:opacity-50 file:disabled:pointer-events-none
                            dark:text-neutral-500
                            dark:file:bg-blue-500
                            dark:hover:file:bg-blue-400
                          "/>
                        {searchParams?.pro_card && (
                            <p className="text-red-500 text-center text-sm">
                                {searchParams.pro_card}
                            </p>
                        )}
                    </label>

                    <p className="font-extrabold text-xl text-darkblue mx-3">Parrainage</p>
                    <Input name="parrain" label="Code parrain" type="number"/>

                    <div className="flex gap-2 justify-end">
                        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
                            Commencer
                        </Button>
                    </div>
                    {searchParams?.message && (
                        <p className="text-red-500 text-center text-sm">
                            {searchParams.message}
                        </p>
                    )}
                </form>
            </CardBody>
        </Card>
    )
}