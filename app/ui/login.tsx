"use client"

import {Card, CardBody, Input, Link, Tab, Tabs} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import React from "react";

export function SignCard({signIn, signUp, searchParams}: {
    signIn: (formData: FormData) => Promise<never>,
    signUp: (formData: FormData) => Promise<never>,
    searchParams: { message: string }
}) {
    const [selected, setSelected] = React.useState("login");

    return (
        <Card className="px-3 pt-3 pb-8 m-5">
            <CardBody className="overflow-hidden">
                <Tabs
                    fullWidth
                    size="md"
                    aria-label="Tabs form"
                    selectedKey={selected}
                    // @ts-ignore
                    onSelectionChange={setSelected}
                >
                    <Tab key="login" title="Se connecter">
                        <p className="text-xl font-bold mx-auto mb-3">Se connecter</p>
                        <form className="flex flex-col gap-4" action={signIn}>
                            <Input isRequired name="email" label="Email" placeholder="email@exemple.com"
                                   type="email"/>
                            <Input
                                isRequired
                                name="password"
                                label="Mot de passe"
                                placeholder="••••••••••••••••"
                                type="password"
                            />
                            <p className="text-center text-small">
                                Pas encore de compte?{" "}
                                <Link size="md" underline="hover" onClick={() => setSelected("sign-up")}>
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
                    </Tab>
                    <Tab key="sign-up" title="S'enregistrer">
                        <form className="flex flex-col gap-4" action={signUp}>
                            <div className="flex gap-3">
                                <Input isRequired name="nom" label="Nom" placeholder="Jean"/>
                                <Input isRequired name="prenom" label="Prenom" placeholder="Dupont"/>
                            </div>
                            <Input isRequired name="email" label="Email" placeholder="email@exemple.com"
                                   type="email"/>
                            <Input
                                isRequired
                                name="password"
                                label="Mot de passe"
                                placeholder="••••••••••••••••"
                                type="password"
                            />
                            <p className="text-center text-small">
                                Déjà un compte?{" "}
                                <Link size="md" underline="hover" onClick={() => setSelected("login")}>
                                    Se connecter
                                </Link>
                            </p>
                            <div className="flex gap-2 justify-end">
                                <Button fullWidth color="primary" type="submit">
                                    S'enregistrer
                                </Button>
                            </div>
                            {searchParams?.message && (
                                <p className="text-red-500 text-center">
                                    {searchParams.message}
                                </p>
                            )}
                        </form>
                    </Tab>
                </Tabs>
            </CardBody>
        </Card>
    )
}