'use client'

import MissionsWrapper from "@/app/ui/missions";
import Calendar from "@/app/ui/calendar";
import Search, {DatePicker, Description, Duration, End, List, Start} from "@/app/ui/search";
import {Suspense} from "react";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {useFormState} from "react-dom";
import {createOffer, StateOffer} from "@/app/lib/actions";

export default async function Page(){
    const initialState = {message: null, errors: {}};
    const [state, dispatch] = useFormState<StateOffer, FormData>(createOffer, initialState)

    return (
        <div className="w-full p-12">
            <div className="flex w-full items-center justify-between mb-5">
                <h1 className="text-2xl">Poster une mission</h1>
            </div>
            <form id="formData" action={dispatch}>
                <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
                    <Suspense>
                        <Duration/>
                        <Start/>
                        <End/>
                        <List placeholder="Diplômes" list="fonction" name="certificate"/>
                        <DatePicker/>
                    </Suspense>
                </div>
                <div className="pt-6">
                    <Description/>
                </div>
                <div className="w-full flex justify-center">
                    <button className="p-12">Poster</button>
                </div>
            </form>

            <div className="flex w-full items-center justify-between mb-5 mt-5">
                <h1 className="text-2xl">Calendriers</h1>
            </div>
            <Calendar/>
        </div>
    )
}