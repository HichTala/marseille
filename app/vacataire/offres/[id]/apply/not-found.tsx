import Link from 'next/link';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceFrown} from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
    return (
        <main className="flex h-full flex-col items-center justify-center gap-2">
            <FontAwesomeIcon icon={faFaceFrown} />
            <h2 className="text-xl font-semibold">404 Not Found</h2>
            <p>Could not find the requested invoice.</p>
            <Link
                href="/vacataire/offres"
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
            >
                Go Back
            </Link>
        </main>
    );
}