'use client'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faGraduationCap, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {Chip} from "@nextui-org/react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

export function ChipContainer({
                         piscine,
                         certificate,
                         date
                     }: {
    piscine: string;
    certificate: string;
    date?: Date | null;
}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const closePiscine = useDebouncedCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.delete('piscine');
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const closeCertificate = useDebouncedCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.delete('certificate');
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    const closeDate = useDebouncedCallback(() => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        params.delete('date');
        replace(`${pathname}?${params.toString()}`);
    }, 300);


    return (
        <div className="flex mb-5">
            {
                piscine != ""
                &&
                <Chip
                    className="px-2 mx-2"
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
                    className="px-2 mx-2"
                    startContent={<FontAwesomeIcon icon={faGraduationCap} />}
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
                    className="px-2 mx-2"
                    startContent={<FontAwesomeIcon icon={faCalendar} />}
                    variant="flat"
                    color="primary"
                    onClose={closeDate}
                >
                    {date?.toString()}
                </Chip>
            }
        </div>
    )
}