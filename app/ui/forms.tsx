'use client'

import {useFormState} from "react-dom";
import {createMission, StateMission} from "@/app/lib/actions";
import {Checkbox, Input, Textarea} from "@nextui-org/react";
import React from "react";
import {format} from "date-fns";

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