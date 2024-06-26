'use client';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendarDays, faComment,
    faHourglass,
    faHourglassEnd, faHourglassStart,
    faMagnifyingGlass,
    faUser, faGraduationCap,
    faWaterLadder
} from "@fortawesome/free-solid-svg-icons";
import {usePathname, useSearchParams, useRouter} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import {
    Autocomplete,
    AutocompleteItem,
    CheckboxGroup,
    Chip,
    DatePicker,
    Input, tv, useCheckbox,
    VisuallyHidden
} from "@nextui-org/react";
import React from "react";

export function Search({placeholder}: { placeholder: string }) {
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

    const SearchIcon = (props: any) => (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    )

    return (
        <div className="relative flex flex-1 flex-shrink-0 align-middle items-center px-8">
            <Input
                label="Piscine"
                isClearable
                radius="lg"
                classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-xl",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focus=true]:bg-default-200/50",
                        "dark:group-data-[focus=true]:bg-default/60",
                        "!cursor-text",
                    ],
                }}
                placeholder="Rechercher..."
                startContent={
                    <SearchIcon
                        className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"/>
                }
                onChange={
                    event => {
                        handleSearch(event.target.value)
                    }
                }
            />

            {/*<label htmlFor="search" className="sr-only">*/}
            {/*    Search*/}
            {/*</label>*/}
            {/*<input*/}
            {/*    className="peer block w-full bg-transparent border-non py-[12px] pl-10 text-sm outline-2 text-dark-blue placeholder:text-gray-200 dark:placeholder-gray-400 dark:text-customwhite"*/}
            {/*    placeholder={placeholder}*/}
            {/*    onChange={event => {*/}
            {/*        handleSearch(event.target.value);*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<FontAwesomeIcon icon={faMagnifyingGlass}*/}
            {/*                 className="absolute left-10 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-200 peer-focus:text-gray-900"/>*/}

        </div>
    );
}

export function SearchValidation({placeholder}: { placeholder: string }) {
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

    const SearchIcon = (props: any) => (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    )

    return (
        <div className="relative flex flex-1 flex-shrink-0 align-middle items-center px-8">
            <Input
                label="Vacataire"
                isClearable
                radius="lg"
                classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-xl",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focus=true]:bg-default-200/50",
                        "dark:group-data-[focus=true]:bg-default/60",
                        "!cursor-text",
                    ],
                }}
                placeholder="Rechercher..."
                startContent={
                    <SearchIcon
                        className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"/>
                }
                onChange={
                    event => {
                        handleSearch(event.target.value)
                    }
                }
            />
        </div>
    );
}

export function List({placeholder, list, name}: { placeholder: string, list: string, name: string }) {
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

    const certificate = [
        {label: "BNSSA", value: "bnssa", description: "Diplôme BNSSA"},
        {label: "MNS", value: "mns", description: "Diplôme MNS"}
    ]

    return (
        <div className="relative flex flex-1 flex-shrink-0 px-8">
            <Autocomplete
                label="Diplôme"
                placeholder="Rechercher..."
                defaultItems={certificate}
                className="max-w-xs"
                inputProps={{
                    classNames: {
                        input: [
                            "bg-transparent",
                            "text-black/90 dark:text-white/90",
                            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                        ],
                        inputWrapper: [
                            "shadow-xl",
                            "bg-default-200/50",
                            "dark:bg-default/60",
                            "backdrop-blur-xl",
                            "backdrop-saturate-200",
                            "hover:bg-default-200/70",
                            "dark:hover:bg-default/70",
                            "group-data-[focus=true]:bg-default-200/50",
                            "dark:group-data-[focus=true]:bg-default/60",
                            "!cursor-text",
                        ],
                    },
                }}
                startContent={
                    <FontAwesomeIcon icon={faGraduationCap}
                                     className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"/>
                }
                onSelectionChange={
                    key => {
                        handleSearch(key)
                    }
                }
            >
                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
            </Autocomplete>

            {/*<input*/}
            {/*    name={name}*/}
            {/*    className="peer block w-full bg-transparent border-none py-[12px] pl-10 text-sm outline-2 text-dark-blue placeholder:text-gray-200 dark:placeholder-gray-400 dark:text-customwhite"*/}
            {/*    placeholder={placeholder}*/}
            {/*    list={list}*/}
            {/*    onChange={event => {*/}
            {/*        handleSearch(event.target.value);*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<FontAwesomeIcon icon={faUser}*/}
            {/*                 className="absolute left-10 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-200 peer-focus:text-gray-200"/>*/}

            {/*<datalist id="fonction">*/}
            {/*    <option value="BNSSA"/>*/}
            {/*    <option value="Prof"/>*/}
            {/*    <option value="Etc"/>*/}
            {/*</datalist>*/}
        </div>
    );
}

export function Datepicker() {
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

    const CalendarIcon = (props: any) => (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M7.75 2.5a.75.75 0 0 0-1.5 0v1.58c-1.44.115-2.384.397-3.078 1.092c-.695.694-.977 1.639-1.093 3.078h19.842c-.116-1.44-.398-2.384-1.093-3.078c-.694-.695-1.639-.977-3.078-1.093V2.5a.75.75 0 0 0-1.5 0v1.513C15.585 4 14.839 4 14 4h-4c-.839 0-1.585 0-2.25.013z"
                fill="currentColor"
            />
            <path
                clipRule="evenodd"
                d="M2 12c0-.839 0-1.585.013-2.25h19.974C22 10.415 22 11.161 22 12v2c0 3.771 0 5.657-1.172 6.828C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14zm15 2a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2m-4-5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-6-3a1 1 0 1 0 0-2a1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2a1 1 0 0 0 0 2"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    )

    return (
        <div className="relative flex flex-1 flex-shrink-0 px-8">
            <DatePicker
                label="Date"
                className="max-w-[284px]"
                onChange={
                    date => {
                        handleSearch(date);
                    }
                }
                startContent={
                    <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                }
            />
            {/*<input*/}
            {/*    name="date"*/}
            {/*    type="date"*/}
            {/*    className="peer block w-full bg-transparent border-none py-[12px] pl-10 text-sm outline-2 text-dark-blue placeholder:text-gray-200 dark:placeholder-gray-400 dark:text-customwhite"*/}
            {/*    onChange={event => {*/}
            {/*        handleSearch(event.target.value);*/}
            {/*    }}*/}
            {/*/>*/}
            {/*<FontAwesomeIcon icon={faCalendarDays}*/}
            {/*                 className="absolute left-10 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-200 peer-focus:text-gray-900"/>*/}

        </div>
    );
}

const checkbox = tv({
    slots: {
        base: "border-default hover:bg-default-200",
        content: "text-default-500"
    },
    variants: {
        isSelected: {
            true: {
                base: "border-primary bg-primary hover:bg-primary-500 hover:border-primary-500",
                content: "text-primary-foreground pl-1"
            }
        },
        isFocusVisible: {
            true: {
                base: "outline-none ring-2 ring-focus ring-offset-2 ring-offset-background",
            }
        }
    }
})

// @ts-ignore
const CustomCheckbox = (props) => {
    const {
        children,
        isSelected,
        isFocusVisible,
        getBaseProps,
        getLabelProps,
        getInputProps,
    } = useCheckbox({
        ...props
    })

    const styles = checkbox({isSelected, isFocusVisible})

    return (
        <label {...getBaseProps()}>
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            <Chip
                classNames={{
                    base: styles.base(),
                    content: styles.content(),
                }}
                color="primary"
                startContent={isSelected ? <svg
                    aria-hidden="true"
                    fill="none"
                    focusable="false"
                    height="1em"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    width="1em"
                    className="ml-1"
                >
                    <polyline points="20 6 9 17 4 12"/>
                </svg> : null}
                variant="faded"
                {...getLabelProps()}
            >
                {children ? children : isSelected ? "Enabled" : "Disabled"}
            </Chip>
        </label>
    );
}

export function StateCheckbox({currentState}: { currentState: string[] }) {
    const [groupSelected, setGroupSelected] = React.useState(currentState);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((groupSelected) => {
        setGroupSelected(groupSelected)
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (groupSelected) {
            params.set('state', groupSelected.join(","));
        } else {
            params.delete('state');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    // ["En Attente", "Acceptée", "Terminée", "Annulée", "Refusée"]

    return (
        <div className="flex flex-col gap-1 w-full">
            <CheckboxGroup
                className="gap-1"
                label="Status"
                orientation="horizontal"
                value={groupSelected}
                onChange={handleSearch}
            >
                <CustomCheckbox value="0">En Attente</CustomCheckbox>
                <CustomCheckbox value="1">Acceptée</CustomCheckbox>
                <CustomCheckbox value="2">Terminée</CustomCheckbox>
                <CustomCheckbox value="3">Annulée</CustomCheckbox>
                <CustomCheckbox value="4">Refusée</CustomCheckbox>
            </CheckboxGroup>
        </div>
    )
}

export function StateCheckboxValidation({currentState}: { currentState: string[] }) {
    const [groupSelected, setGroupSelected] = React.useState(currentState);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((groupSelected) => {
        setGroupSelected(groupSelected)
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (groupSelected) {
            params.set('state', groupSelected.join(","));
        } else {
            params.delete('state');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    // ["En Attente", "Acceptée", "Terminée", "Annulée", "Refusée"]

    return (
        <div className="flex flex-col gap-1 w-full">
            <CheckboxGroup
                className="gap-1"
                label="Status"
                orientation="horizontal"
                value={groupSelected}
                onChange={handleSearch}
            >
                <CustomCheckbox value="0">Non pourvue</CustomCheckbox>
                <CustomCheckbox value="5">Passée</CustomCheckbox>
                <CustomCheckbox value="1">À venir</CustomCheckbox>
                <CustomCheckbox value="2">Terminée</CustomCheckbox>
                <CustomCheckbox value="4">Annulée</CustomCheckbox>
            </CheckboxGroup>
        </div>
    )
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

export function Start() {
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

export function End() {
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