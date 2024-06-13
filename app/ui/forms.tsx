'use client'

import {useFormState} from "react-dom";
import {createMission, createOffer, StateMission, StateOffer} from "@/app/lib/actions";
import {
    Checkbox,
    DatePicker,
    Input,
    Modal, ModalBody,
    ModalContent, ModalFooter, ModalHeader,
    Select,
    SelectItem,
    Textarea,
    TimeInput
} from "@nextui-org/react";
import React, {useState} from "react";
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
        {key: 'BNSSA', label:'BNSSA'},
        {key: 'MNS', label:'MNS'},
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