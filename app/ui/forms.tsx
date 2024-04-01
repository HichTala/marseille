'use client'

import {useFormState} from "react-dom";
import {createMission, StateMission} from "@/app/lib/actions";

export function OfferForm({
                              offer
                          }: {
    offer: any
}) {
    const initialState = {message: null, errors: {}};
    const [state, dispatch] = useFormState<StateMission, FormData>(createMission, initialState)

    const date = new Date(Date.now());

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();


    return (
        <form id="formData" className="pt-4" action={dispatch}>
            <div className="flex">
                <input name="contract" type="checkbox" className="text-customblue bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"/>
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
            <p className="text-darkblue dark:text-customwhite font-extrabold text-xl pt-4">Prix (HT)</p>
            <input name="price" type="number" step="any" placeholder="XX,XX €"
                                                     className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:p-2.5 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
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

            <textarea  name="comment"
                   className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:p-2.5 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>

            <p className="text-darkblue dark:text-customwhite font-extrabold text-xl pt-4">Signature</p>

            <div className="pt-2 flex">
                <p className="pr-5">Le {day}/{month}/{year} à {hours}:{minutes}</p>
            </div>
            <div className="flex pt-5 justify-center">
                <button type="submit"
                        className="bg-customblue rounded-xl px-4 py-2 mb-2 text-white">
                    Postuler
                </button>
            </div>
        </form>
    )
}