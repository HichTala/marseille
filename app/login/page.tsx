import {headers} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {Button} from "@nextui-org/button";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {Card, CardBody, Input, Link, Tabs} from "@nextui-org/react";
import Image from "next/image";

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
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            return redirect("/login?message=Email ou mot de passe incorrect");
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
                <Card className="px-3 pt-3 pb-8 m-5">
                    <CardBody className="overflow-hidden">
                        <p className="text-xl font-bold mx-auto mb-3">Se connecter</p>
                        <form className="flex flex-col gap-4" action={signIn}>
                            <Input isRequired name="email" label="Email" placeholder="email@exemple.com" type="email"/>
                            <Input
                                isRequired
                                name="password"
                                label="Mot de passe"
                                placeholder="••••••••••••••••"
                                type="password"
                            />
                            <p className="text-center text-small">
                                Pas encore de compte?{" "}
                                <Link size="md" href="#" underline="hover">
                                    S'enregistrer
                                </Link>
                            </p>
                            <div className="flex gap-2 justify-end">
                                <Button fullWidth color="primary" type="submit">
                                    Se connecter
                                </Button>
                            </div>
                            {searchParams?.message && (
                                <p className="text-red-500 text-center">
                                    {searchParams.message}
                                </p>
                            )}
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
