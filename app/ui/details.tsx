'use server'

import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {notFound} from "next/navigation";
import {OfferForm} from "@/app/ui/forms";

export async function Details({
                                  offer_id
                              }: {
    offer_id: string
}) {
    const supabase = createServerComponentClient({cookies})
    const {data: offers} = await supabase.from("offres").select().eq("id", offer_id)

    if (!offers) {
        notFound()
    }

    return (
        <div className="popup">
            <div className="min-w-full align-middle p-12">
                {offers?.map((offer) => (
                    <div
                        key={offer.id}
                        className="mb-2 w-full rounded-md bg-white p-4"
                    >
                        <div className="flex items-center justify-between border-b pb-4">
                            <div>
                                <div className="flex items-center justify-between border-b">
                                    <p className="text-black">{offer.name}</p>
                                </div>
                                <p className="text-sm text-gray-500">{offer.address}</p>
                            </div>
                            <div>
                                <div className="flex text-black"><p
                                    className="text-gray-500 text-sm">Date: </p> {offer.date}</div>
                                <div className="flex text-black"><p
                                    className="text-gray-500 text-sm">Durée: </p>  {offer.duration}</div>
                            </div>
                        </div>
                        <div>
                            <div className="flex text-black"><p
                                className="text-gray-500 text-sm pr-2">Diplôme: </p> {offer.certificate}</div>
                            <div className="flex text-black"><p
                                className="text-gray-500 text-sm pr-2">Score: </p>  {offer.score}</div>
                            <div className="flex text-black"><p
                                className="text-gray-500 text-sm pr-2">Responsable: </p>  {offer.supervisor}</div>
                        </div>
                        <div className="flex text-black">
                            <p className="text-gray-500 text-sm pr-4">Début:</p> {offer.start}
                            <p className="text-gray-500 text-sm pr-4  pl-4">Fin:</p> {offer.end}
                        </div>
                        <div className="pt-4">
                            <p className="text-gray-500 text-sm">Description:</p>
                            <p className="text-black">{offer.description}</p>
                        </div>
                        <div className="text-gray-500 pt-4">
                            <p>Terme et Conditions</p>
                            <p className="text-black text-sm pt-2">premiercontrat398A34.pdf</p>
                            <p className="text-black text-sm">deuxiemecontrat123476.pdf</p>
                        </div>
                        <OfferForm offer={offer}/>
                        {/*<form id="formData" className="pt-4 text-black" action={dispatch}>*/}
                        {/*    <input name="offer_id" className="hidden" value={offer.id}/>*/}
                        {/*    <div className="flex">*/}
                        {/*        <input name="contract" type="checkbox"/>*/}
                        {/*        <p className="pl-2">J'ai pris connaissance de blabalbal</p>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        {state.errors?.contract &&*/}
                        {/*            state.errors.contract.map((error: string) => (*/}
                        {/*                <p className="mt-2 text-sm text-red-500" key={error}>*/}
                        {/*                    {error}*/}
                        {/*                </p>*/}
                        {/*            ))}*/}
                        {/*    </div>*/}
                        {/*    <div className="pt-2 flex">*/}
                        {/*        <p className="pr-5">Prix (HT)</p> <input name="price" type="text"*/}
                        {/*                                                 className="bg-gray-100 rounded"/>*/}
                        {/*    </div>*/}
                        {/*    <p className="text-black text-sm">MONTANT TOTAL DE LA MISSION</p>*/}
                        {/*    <p className="text-black text-sm">(Nb heures x Prix Horaire)</p>*/}
                        {/*    <p className="text-gray-500 text-lg pt-5">Signature</p>*/}

                        {/*    <div className="pt-2 flex">*/}
                        {/*        <p className="pr-5">Nom:</p> <input type="text" className="bg-gray-100 rounded"/>*/}
                        {/*    </div>*/}
                        {/*    <div className="pt-5 justify-between">*/}
                        {/*        <button type="submit"*/}
                        {/*                className="bg-gray-700 rounded-md px-4 py-2 text-foreground mb-2 text-white">*/}
                        {/*            Postuler*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</form>*/}
                    </div>
                ))}
            </div>
        </div>
    )
}