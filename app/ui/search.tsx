'use client';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarDays, faComment,
    faHourglass,
    faHourglassEnd, faHourglassStart,
    faMagnifyingGlass,
    faUser,
    faWaterLadder
} from "@fortawesome/free-solid-svg-icons";
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";

export default function Search({placeholder}: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('piscine', term);
        } else {
            params.delete('piscine');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex flex-1 flex-shrink-0 align-middle items-center px-8 border-b-2 border-gray-200 dark:border-gray-600">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full bg-transparent border-non py-[12px] pl-10 text-sm outline-2 text-dark-blue placeholder:text-gray-200 dark:placeholder-gray-400 dark:text-customwhite"
                placeholder={placeholder}
                onChange={event => {
                    handleSearch(event.target.value);
                }}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass}
                             className="absolute left-10 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-200 peer-focus:text-gray-900"/>

        </div>
    );
}

export function List({placeholder, list, name}: { placeholder: string, list: string, name: string}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('certificate', term);
        } else {
            params.delete('certificate');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex flex-1 flex-shrink-0 px-8 border-b-2 border-gray-200 dark:border-gray-600">
            <input
                name={name}
                className="peer block w-full bg-transparent border-none py-[12px] pl-10 text-sm outline-2 text-dark-blue placeholder:text-gray-200 dark:placeholder-gray-400 dark:text-customwhite"
                placeholder={placeholder}
                list={list}
                onChange={event => {
                    handleSearch(event.target.value);
                }}
            />
            <FontAwesomeIcon icon={faUser}
                             className="absolute left-10 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-200 peer-focus:text-gray-200"/>

            <datalist id="fonction">
                <option value="BNSSA"/>
                <option value="Prof"/>
                <option value="Etc"/>
            </datalist>
        </div>
    );
}

export function DatePicker() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('date', term);
        } else {
            params.delete('date');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <div className="relative flex flex-1 flex-shrink-0 px-8">
            <input
                name="date"
                type="date"
                className="peer block w-full bg-transparent border-none py-[12px] pl-10 text-sm outline-2 text-dark-blue placeholder:text-gray-200 dark:placeholder-gray-400 dark:text-customwhite"
                onChange={event => {
                    handleSearch(event.target.value);
                }}
            />
            <FontAwesomeIcon icon={faCalendarDays}
                             className="absolute left-10 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-200 peer-focus:text-gray-900"/>

        </div>
    );
}

export function Duration() {
    return (
        <div>
            <p>
                Durée
            </p>
            <div className="relative flex flex-1 flex-shrink-0">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    name="duration"
                    type="time"
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black placeholder:text-gray-500"
                    // onChange={event => {
                    //     handleSearch(event.target.value);
                    //}}
                />
                <FontAwesomeIcon icon={faHourglass}
                                 className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>

            </div>
        </div>
    );
}

export  function Start() {
    return (
        <div>
            <p>
                Début
            </p>
            <div className="relative flex flex-1 flex-shrink-0">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    name="start"
                    type="time"
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black placeholder:text-gray-500"
                    // onChange={event => {
                    //     handleSearch(event.target.value);
                    //}}
                />
                <FontAwesomeIcon icon={faHourglassStart}
                                 className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>

            </div>
        </div>
    );
}

export function End(){
    return (
        <div>
            <p>
                Fin
            </p>
            <div className="relative flex flex-1 flex-shrink-0">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <input
                    name="end"
                    type="time"
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black placeholder:text-gray-500"
                    // onChange={event => {
                    //     handleSearch(event.target.value);
                    //}}
                />
                <FontAwesomeIcon icon={faHourglassEnd}
                                 className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>

            </div>
        </div>
    );
}

export function Description() {
    return (
        <div>
            <div className="relative flex flex-1 flex-shrink-0">
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <textarea
                    name="description"
                    placeholder="Description"
                    className="h-75 peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black placeholder:text-gray-500"
                    // onChange={event => {
                    //     handleSearch(event.target.value);
                    //}}
                />
                <FontAwesomeIcon icon={faComment}
                                 className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>

            </div>
        </div>
    )
}