import {createClient} from "@/utils/supabase/server";
import Image from "next/image";
import styles from '@/app/ui/home.module.css'

export default async function Index() {
    return (
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
            <nav className={`w-full flex border-b border-b-foreground/10 h-16 relative ${styles.navbar}`}>
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    <Image src="/logo.png"
                           height={25}
                           width={139}
                           alt="Logo"/>
                </div>
            </nav>

            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-20 px-3 relative justify-center items-center">
                <a className={`relative table ${styles.box}`} href="/login">
                    <div className="relative table-cell align-middle">
                        <div className="relative justify-center text-center">
                            Entreprise🐬
                        </div>
                    </div>
                </a>

                <a className={`relative table ${styles.box}`} href="/login">
                    <div className="relative table-cell align-middle">
                        <div className="relative justify-center text-center">
                            Prestataire🏊
                        </div>
                    </div>
                </a>
            </div>

            <footer
                className={`w-full fixed bottom-0 border-t border-t-foreground/10 p-4 flex justify-center text-center text-xs ${styles.footer}`}>
                <Image src="/logo.png"
                       height={25}
                       width={139}
                       alt="Logo"/>
            </footer>
        </div>
    );
}
