import {notFound} from "next/navigation";
import {Details} from "@/app/ui/details";
import {Navbar} from "@/app/ui/navbar";
import {Button} from "@nextui-org/button";
import {Link} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

export default async function Page({params}: { params: { id: string } }) {
    const id = params.id

    return (
        <div className="w-full pt-2 items-center">
            <Navbar corresponding_page="offres"/>
            <Button
                className="m-4 cursor-pointer"
                href="/vacataire/offres"
                as={Link}
                color="primary"
                startContent={<FontAwesomeIcon icon={faChevronLeft} />}
                variant="solid"
            >
                Retour
            </Button>
            <div className="flex justify-center align-middle px-8 w-full">
                <Details offer_id={id}/>
            </div>
        </div>
    );
}