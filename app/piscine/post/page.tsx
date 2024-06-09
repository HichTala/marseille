import {Navbar} from "@/app/ui/navbar";
import {Link} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@nextui-org/button";
import {Details} from "@/app/ui/details";
import {Post} from "@/app/ui/post";

export default function Page() {
    return (
        <div className="w-full pt-2 items-center">
            <Navbar corresponding_page="offres"/>
            <Button
                className="m-4 cursor-pointer"
                href="/piscine/jobs"
                as={Link}
                color="primary"
                startContent={<FontAwesomeIcon icon={faChevronLeft}/>}
                variant="solid"
            >
                Retour
            </Button>
            <div className="flex justify-center align-middle px-2 w-full">
                <Post />
            </div>
        </div>
    )
}