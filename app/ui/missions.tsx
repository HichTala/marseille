import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarDays, faMoneyBill1Wave, faWaterLadder} from "@fortawesome/free-solid-svg-icons";

export default async function MissionsWrapper() {

    return (
        <>
            {/* NOTE: comment in this code when you get to this point in the course */}

            <Card title="VSP - Centre Aquatique" date="26/02/2024" price="110.00 €" />
            <Card title="VSP - Centre Aquatique" date="26/02/2024" price="110.00 €" />
            <Card title="VSP - Centre Aquatique" date="26/02/2024" price="110.00 €" />
            <Card title="VSP - Centre Aquatique" date="26/02/2024" price="110.00 €" />
        </>
    );
}

export function Card({
                         title,
                         date,
                         price,
                     }: {
    title: string;
    date: string;
    price: string;
}) {

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                <FontAwesomeIcon icon={faWaterLadder} className="h-5 w-5 text-gray-700"/>
                <h3 className="ml-2 text-sm font-medium text-gray-700">{title}</h3>
            </div>
            <div className="flex p-4">
                <FontAwesomeIcon icon={faCalendarDays} className="h-5 w-5 text-gray-700" />
                <h3 className="ml-2 text-sm font-medium text-gray-700">{date}</h3>
            </div>
            <div className="flex p-4">
                <FontAwesomeIcon icon={faMoneyBill1Wave} className="h-5 w-5 text-gray-700" />
                <h3 className="ml-2 text-sm font-medium text-gray-700">{price}</h3>
            </div>
        </div>
    );
}
