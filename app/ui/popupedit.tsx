'use client'

import React, {useState} from "react";
import {deleteProp, updateProp} from "@/app/ui/edit";
import {Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCalendar,
    faClock,
    faGraduationCap,
    faMoneyBill1Wave,
    faPenToSquare,
    faStar
} from "@fortawesome/free-solid-svg-icons";
import {differenceInHours, format, getHours, parse, parseISO} from "date-fns";
import {Button} from "@nextui-org/button";

export function PopupEdit({popupOpen, setIsOpen, mission}: {
    popupOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    mission: any | null
}) {
    const stats = ["En Attente", "Acceptée", "Terminée", "Annulée", "Refusée"]
    const stats_color: ("primary" | "success" | "warning" | "default" | "danger" | "secondary" | undefined)[] = ["primary", "success", "warning", "default", "danger"]

    const togglePopup = () => {
        setIsOpen(!popupOpen);
    };

    const [deletePopupOpen, setDeleteIsOpen] = useState(false);
    const [updatePopupOpen, setUpdateIsOpen] = useState(false);

    const [price, setPrice] = useState("0.00");

    const toggleDeletePopup = () => {
        setIsOpen(!popupOpen);
        setDeleteIsOpen(!deletePopupOpen)
    };

    const toggleUpdatePopup = () => {
        setPrice(String(mission.price / 100))
        setIsOpen(!popupOpen);
        setUpdateIsOpen(!updatePopupOpen)
    };

    const handleDelete = async () => {
        await deleteProp({mission});
        setDeleteIsOpen(!deletePopupOpen)
        window.location.reload();
    }

    const handleUpdate = async () => {
        await updateProp({mission, price});
        setUpdateIsOpen(!updatePopupOpen)
        window.location.reload();
    }

    const isDisabled = mission.status != 0

    return (
        <div>
            <Modal className="m-auto" backdrop={"blur"} isOpen={popupOpen} onClose={togglePopup}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col">{mission.offres['piscine']['name']}</ModalHeader>
                            <ModalBody>
                                <div className="text-gray-400 font-sans text-cente">
                                    {mission.offres['piscine']['address']}
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-gray-500 dark:text-beige font-light">{mission.offres['piscine']['city']}</p>
                                    <div className="flex">
                                        <FontAwesomeIcon icon={faStar} className="text-amber-400"/>
                                        <p className="px-1 text-sm">{mission.offres['piscine']['score'] !== null ? mission.offres['piscine']['score'] : 5}</p>
                                    </div>
                                </div>
                                <div className="flex w-full justify-between px-5 py-2">
                                    <div className="text-center">
                                        <p className="text-gray-400 font-sans text-cente">Début</p>
                                        <p className="text-xs px-1">{format(mission.offres['startDatetime'], 'HH:mm')}</p>
                                    </div>
                                    <div className="border-r-2"/>
                                    <div className="text-center">
                                        <p className="text-gray-400 font-sans text-cente">Pause</p>

                                        <p className="text-xs px-1">( {differenceInHours(parseISO(mission.offres['endDatetime']), parseISO(mission.offres['startDatetime'])) - getHours(parse(mission.offres['duration'], 'HH:mm:ss', new Date()))}h
                                            )</p>
                                    </div>
                                    <div className="border-r-2"/>
                                    <div>
                                        <p className="text-center text-gray-400 font-sans text-cente">Fin</p>
                                        <p className="text-xs px-1">{format(mission.offres['endDatetime'], 'HH:mm')}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between p-2">
                                    <div className="flex">
                                        <FontAwesomeIcon className="text-primary" icon={faCalendar}/>
                                        <p className="text-sm px-1">{format(mission.offres['startDatetime'], 'dd/MM/yyyy')}</p>
                                    </div>
                                    <div className="flex">
                                        <FontAwesomeIcon className="text-primary" icon={faClock}/>
                                        <p className="text-sm px-1">{format(parse(mission.offres['duration'], 'HH:mm:ss', new Date()), 'HH:mm')}</p>
                                    </div>
                                    <div className="flex">
                                        <FontAwesomeIcon className="text-primary" icon={faGraduationCap}/>
                                        <p className="text-sm px-1">{mission.offres['certificate']}</p>
                                    </div>
                                </div>
                                {
                                    mission.offres['description']
                                    &&
                                    <div>
                                        <p className="font-bold">Description : </p>
                                        <p>{mission.offres['description']}</p>
                                    </div>
                                }
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="flex pt-1 px-2">
                                            <FontAwesomeIcon className="my-auto text-primary" icon={faMoneyBill1Wave}/>
                                            <p className="my-auto px-2">Prix : </p>
                                            <p className="my-auto">{mission.price / 100} €</p>
                                        </div>
                                        <div className="flex">
                                            <Button
                                                isDisabled={isDisabled}
                                                onPress={toggleUpdatePopup}
                                                variant="light"
                                                color="primary"
                                                startContent={<FontAwesomeIcon icon={faPenToSquare} />}
                                            >
                                                Modifier
                                            </Button>
                                        </div>
                                    </div>
                                    <div
                                        className="flex py-1 px-2">
                                        <Button isDisabled color={stats_color[mission.status]} variant="flat">
                                            {stats[mission.status]}
                                        </Button>
                                    </div>
                                </div>
                                {/*<div*/}
                                {/*    className={`flex bg-${stats_color[mission.status]} rounded-lg py-1 px-2 text-darkblue font-bold ml-1 mt-1`}>*/}
                                {/*    <p className="text-[8px] px-1 m-auto">{stats[mission.status]}</p>*/}
                                {/*</div>*/}
                            </ModalBody>
                            <ModalFooter>
                                <Button isDisabled={mission.status == 3} color="danger" variant="flat" onPress={toggleDeletePopup}>
                                    Annuler
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Ok
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal className="m-auto" backdrop={"blur"} isOpen={deletePopupOpen} onClose={toggleDeletePopup}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col">{mission.offres['piscine']['name']}</ModalHeader>
                            <ModalBody>
                                <div className="font-sans text-cente p-3">
                                    Êtes-vous sûr de vouloir annuler la vacation ?
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={handleDelete}>
                                    Oui
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Non
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal className="m-auto" backdrop={"blur"} isOpen={updatePopupOpen} onClose={toggleUpdatePopup}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col">
                                Quel est le nouveau prix ?
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    className="max-w-[50%]"
                                    type="number"
                                    label="Prix"
                                    placeholder="0.00"
                                    labelPlacement="outside"
                                    value={price}
                                    onValueChange={setPrice}
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">€</span>
                                        </div>
                                    }
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Annuler
                                </Button>
                                <Button color="primary" onPress={handleUpdate}>
                                    Enregistrer
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}