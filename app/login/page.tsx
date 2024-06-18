import {headers} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {Button} from "@nextui-org/button";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Card, CardBody, Input, Link, Tab, Tabs} from "@nextui-org/react";
import Image from "next/image";
import {SignCard} from "@/app/ui/login";

export default function Login({
                                  searchParams,
                              }: {
    searchParams: { message: string };
}) {
    const signIn = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        const {error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return redirect("/login?message=Email ou mot de passe incorrect");
        }

        return redirect("/vacataire/offres");
    };

    const signUp = async (formData: FormData) => {
        "use server";

        const origin = headers().get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        const {error} = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}:3000/auth/callback`,
            },
        });

        if (error) {
            console.log(error)
            return redirect("/login?message=Impossible d'authentifier l'utilisateur");
        }

        return redirect("/login?message=Check email to continue sign in process");
    };

    return (
        <div className="w-full pt-2 items-center">
            <div className="flex">
                <Image className="z-10" src="/logo_seul.png" alt="Image logo" width="84" height="84"/>
                <div className="flex items-center w-48 md:w-48 z-10">
                    <Image src="/logo_clair.png" alt="Texte logo" width="200" height="36"
                           className="block dark:hidden"/>
                    <Image src="/logo_dark.png" alt="Texte logo" width="164" height="36" className="hidden dark:block"/>
                </div>
            </div>
            <Button
                className="m-4 cursor-pointer"
                href="/"
                as={Link}
                color="primary"
                startContent={<FontAwesomeIcon icon={faChevronLeft}/>}
                variant="solid"
            >
                Retour
            </Button>

            <div className="flex flex-col w-full">
                <SignCard signIn={signIn} signUp={signUp} searchParams={searchParams} />
            </div>
        </div>
    );
}
