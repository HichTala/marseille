import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import Link from "next/link";

export default async function Table({
                                        piscine,
                                        certificate,
                                        date
                                    }: {
    piscine: string;
    certificate: string;
    date?: Date | null;
}) {
    const supabase = createServerComponentClient({cookies})

    const dateFilter: { date: Date } | {} = date !== null ? {date} : {};

    const {data: offers} = await supabase
        .from("offres")
        .select()
        .or("name.ilike.%" + piscine + "%" + ",city.ilike.%" + piscine + "%" + ",address.ilike.%" + piscine + "%")
        .ilike("certificate", '%' + certificate + '%')
        .match(dateFilter)

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {offers?.map((offer)=>(
                            <div
                                key={offer.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="flex items-center justify-between border-b">
                                            <p className="text-black">{offer.name}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{offer.address}</p>
                                    </div>
                                    <div>
                                        <div className="flex text-black"><p
                                            className="text-gray-500 text-sm">Diplôme: </p> {offer.certificate}</div>
                                        <div className="flex text-black"><p
                                            className="text-gray-500 text-sm">Score: </p>  {offer.score}</div>
                                    </div>
                                    <div>
                                        <div className="flex text-black"><p
                                            className="text-gray-500 text-sm">Date: </p> {offer.date}</div>
                                        <div className="flex text-black"><p
                                            className="text-gray-500 text-sm">Durée: </p>  {offer.duration}</div>
                                    </div>
                                </div>

                                <Link
                                    href={`/vacataire/offres/${offer.id}/apply`}
                                    className="bg-green-300 rounded-md px-1 py-1 text-foreground text-white"
                                >
                                    Postuler
                                </Link>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                            Piscine
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Adresse
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Category
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Date
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Score
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Nb d'heures
                            </th>
                            <th scope="col" className="relative py-3 pl-6 pr-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {offers?.map((offer)=>(
                            <tr className="whitespace-nowrap py-3 pl-6 pr-3">
                                <td className="whitespace-nowrap px-3 py-3">
                                    {offer.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {offer.address}, {offer.city}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {offer.certificate}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {offer.date}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {offer.score}
                                </td>
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    {offer.duration}
                                </td>
                                <td>
                                    <Link
                                        href={`/vacataire/offres/${offer.id}/apply`}
                                        className="bg-green-300 rounded-md px-1 py-1 text-foreground text-white"
                                    >
                                        Postuler
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export async function PropositionsTable({
                                            piscine,
                                            date
                                        }: {
    piscine: string;
    date?: Date | null;
}) {
    const supabase = createServerComponentClient({cookies})

    const dateFilter: { date: Date } | {} = date !== null ? {date} : {};

    const {data: missions} = await supabase
        .from("missions")
        .select()
        .or("name.ilike.%" + piscine + "%" + ",city.ilike.%" + piscine + "%" + ",address.ilike.%" + piscine + "%")
        .match(dateFilter)

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {missions?.map((mission)=>(
                            <div
                                key={mission.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <div className="flex items-center justify-between border-b">
                                            <p className="text-black">{mission.name}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">{mission.address}</p>
                                    </div>
                                    <div>
                                        <div className="flex text-black"><p
                                            className="text-gray-500 text-sm">Diplôme: </p> {mission.certificate}</div>
                                        <div className="flex text-black"><p
                                            className="text-gray-500 text-sm">Score: </p>  {mission.score}</div>
                                    </div>
                                    <div>
                                        <div className="flex text-black"><p
                                            className="text-gray-500 text-sm">Date: </p> {mission.date}</div>
                                        <div className="flex text-black"><p
                                            className="text-gray-500 text-sm">Durée: </p>  {mission.duration}</div>
                                    </div>
                                </div>

                                <Link
                                    href={`/vacataire/propositions/${mission.id}/apply`}
                                    className="bg-green-300 rounded-md px-1 py-1 text-foreground text-white"
                                >
                                    Postuler
                                </Link>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                        <tr>
                            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                Piscine
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Adresse
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Category
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Date
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Score
                            </th>
                            <th scope="col" className="px-3 py-5 font-medium">
                                Nb d'heures
                            </th>
                            <th scope="col" className="relative py-3 pl-6 pr-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {missions?.map((mission)=>(
                            <tr className="whitespace-nowrap py-3 pl-6 pr-3">
                                <td className="whitespace-nowrap px-3 py-3">
                                    {mission.name}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {mission.address}, {mission.city}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {mission.certificate}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {mission.date}
                                </td>
                                <td className="whitespace-nowrap px-3 py-3">
                                    {mission.score}
                                </td>
                                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                    {mission.duration}
                                </td>
                                <td>
                                    <Link
                                        href={`/vacataire/propositions/${mission.id}/apply`}
                                        className="bg-green-300 rounded-md px-1 py-1 text-foreground text-white"
                                    >
                                        Postuler
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
