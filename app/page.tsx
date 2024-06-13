import {createClient} from "@/utils/supabase/server";
import Image from "next/image";
import styles from '@/app/ui/home.module.css'

import * as React from "react";
import {NextUIProvider} from "@nextui-org/react";


export default async function Index() {
    return (
        <NextUIProvider>
            <div className="w-full pt-2">
                <div className="flex">
                    <Image className="z-10" src="/logo_seul.png" alt="Image logo" width="84" height="84"/>
                    <div className="flex items-center w-48 md:w-48 z-10">
                        <Image src="/logo_clair.png" alt="Texte logo" width="200" height="36"
                               className="block dark:hidden"/>
                        <Image src="/logo_dark.png" alt="Texte logo" width="164" height="36"
                               className="hidden dark:block"/>
                    </div>
                </div>
            </div>
            <div className="flex-1 w-full flex flex-col gap-20 items-center">
                <div
                    className="grid sm:grid-cols-1 lg:grid-cols-2 gap-20 px-3 relative justify-center items-center pb-20 scroll-pb-20 m-14">
                    <a className={`relative table ${styles.box}`} href="/login">
                        <div className="relative table-cell align-middle">
                            <div className="relative justify-center text-center">
                                Se connecter
                            </div>
                            </div>
                        </a>
                    </div>

                    <footer
                        className={`w-full fixed bottom-0 border-t border-t-foreground/10 p-4 flex justify-center text-center text-xs z-10 ${styles.footer}`}>
                        <div>
                            <p className="text-sm text-white">contact@check-in.com</p>
                            <p className="text-white">+33 7 86 64 96 92</p>
                            <p className="text-sm pt-2 text-white">ⓒ Mention Legal Blablabla</p>
                        </div>
                    </footer>
                </div>
        </NextUIProvider>
);
}
