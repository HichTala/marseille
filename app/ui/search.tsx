'use client';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays, faMagnifyingGlass, faUser, faWaterLadder} from "@fortawesome/free-solid-svg-icons";
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
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={event => {
                    handleSearch(event.target.value);
                }}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass}
                             className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>

        </div>
    );
}

export function List({placeholder, list}: { placeholder: string, list: string }) {
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
        <div className="relative flex flex-1 flex-shrink-0">
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black placeholder:text-gray-500"
                placeholder={placeholder}
                list={list}
                onChange={event => {
                    handleSearch(event.target.value);
                }}
            />
            <FontAwesomeIcon icon={faUser}
                             className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>

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
        <div className="relative flex flex-1 flex-shrink-0">
            <input
                type="date"
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black placeholder:text-gray-500"
                onChange={event => {
                    handleSearch(event.target.value);
                }}
            />
            <FontAwesomeIcon icon={faCalendarDays}
                             className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>

        </div>
    );
}

export function Place({placeholder}: { placeholder: string }) {
    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 text-black placeholder:text-gray-500"
                placeholder={placeholder}
                // onChange={event => {
                //     handleSearch(event.target.value);
                //}}
            />
            <FontAwesomeIcon icon={faWaterLadder}
                             className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>

        </div>
    );
}
