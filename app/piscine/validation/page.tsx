import {NavbarPiscine} from "@/app/ui/navbar";
import {PopupFiltreProposition} from "@/app/ui/popup";
import {PropositionsTable, VacationTable} from "@/app/ui/table";

export default function Page(){
    return (
        <div className="w-full pt-2">
            <NavbarPiscine corresponding_page={"validation"}/>
            <div className="w-full p-8 z-auto grid justify-items-center">
                <h1 className="text-5xl font-black md:font-extrabold font-sans text-cente">Propositions</h1>
                <PopupFiltreProposition/>
                <VacationTable/>
            </div>

        </div>
    );
}