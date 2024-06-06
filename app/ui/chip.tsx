'use client'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faGraduationCap, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Chip} from "@nextui-org/react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export function ChipContainer({
                                  piscine,
                                  certificate,
                                  date,
                                  states
                              }: {
    piscine: string;
    certificate: string;
    date?: Date | null;
    states: number[];
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const states_name = ["En Attente", "Acceptée", "Terminée", "Annulée", "Refusée"]

    const closePiscine = () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.delete('piscine');
        replace(`${pathname}?${params.toString()}`);
    }

    const closeCertificate = () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.delete('certificate');
        replace(`${pathname}?${params.toString()}`);
    }

    const closeDate = () => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.delete('date');
        replace(`${pathname}?${params.toString()}`);
    };

    const closeStates = [0, 1, 2, 3, 4].map(
        (state) => (
            () => {
                const params = new URLSearchParams(searchParams);
                const newState = params
                    .get('state')?.split(',')
                    .map(str => str.replace(state.toString(), ''))
                    .filter(str => str !== '')
                    .join(',')
                params.set('page', '1');
                params.set('state', newState ? newState : '');
                replace(`${pathname}?${params.toString()}`);
            }
        )
    )

    return (
        <div className="flex-wrap mb-5">
            {
                piscine != ""
                &&
                <Chip
                    className="px-2 m-1"
                    startContent={<FontAwesomeIcon icon={faMagnifyingGlass}/>}
                    variant="flat"
                    color="primary"
                    onClose={closePiscine}
                >
                    {piscine}
                </Chip>
            }
            {
                certificate != ""
                &&
                <Chip
                    className="px-2 m-1"
                    startContent={<FontAwesomeIcon icon={faGraduationCap}/>}
                    variant="flat"
                    color="primary"
                    onClose={closeCertificate}
                >
                    {certificate}
                </Chip>
            }
            {
                date
                &&
                <Chip
                    className="px-2 m-1"
                    startContent={<FontAwesomeIcon icon={faCalendar}/>}
                    variant="flat"
                    color="primary"
                    onClose={closeDate}
                >
                    {date?.toString()}
                </Chip>
            }
            {
                (states?.length ?? 0) > 0 && (
                    states.map((state) => (
                            <Chip
                                className="px-2 m-1"
                                variant="flat"
                                color="secondary"
                                onClose={closeStates[state]}
                            >
                                {states_name[state]}
                            </Chip>
                        )
                    )
                )
            }
        </div>
    )
}