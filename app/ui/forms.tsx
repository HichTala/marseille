'use client'

import {useFormState} from "react-dom";
import {createMission, State} from "@/app/lib/actions";

export function OfferForm({
                              offer
                          }: {
    offer: any
}) {
    const initialState = {message: null, errors: {}};
    const [state, dispatch] = useFormState<State, FormData>(createMission, initialState)

    const date = new Date(Date.now());

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();


    return (
        <form id="formData" className="pt-4 text-black" action={dispatch}>
            <input name="offer_id" className="hidden" value={offer.id}/>
            <div className="flex">
                <input name="contract" type="checkbox"/>
                <p className="pl-2">J'ai pris connaissance de blabalbal</p>
            </div>
            <div>
                {state.errors?.contract &&
                    state.errors.contract.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <div className="pt-2 flex">
                <p className="pr-5">Prix (HT)</p> <input name="price" type="text"
                                                         className="bg-gray-100 rounded focus:border-amber-50"/>
            </div>
            <div>
                {state.errors?.price &&
                    state.errors.price.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                            {error}
                        </p>
                    ))}
            </div>
            <p className="text-black text-sm">MONTANT TOTAL DE LA MISSION</p>
            <p className="text-black text-sm">(Nb heures x Prix Horaire)</p>

            <p className="text-gray-500 text-lg pt-5">Commentaire</p>

            <textarea  name="comment"
                   className="bg-gray-100 rounded focus:border-amber-50 h-20 w-full"/>

            <p className="text-gray-500 text-lg pt-5">Signature</p>

            <div className="pt-2 flex">
                <p className="pr-5">Le {day}/{month}/{year} à {hours}:{minutes}</p>
            </div>
            <div className="pt-5 justify-between">
                <button type="submit"
                        className="bg-gray-700 rounded-md px-4 py-2 text-foreground mb-2 text-white">
                    Postuler
                </button>
            </div>
        </form>
    )
}