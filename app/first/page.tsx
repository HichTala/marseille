import Image from "next/image";
import {RegisterForm} from "@/app/ui/forms";
import {redirect} from "next/navigation";
import {createClient} from "@/utils/supabase/server";
import React from "react";

export default async function Page({
                                       searchParams,
                                   }: {
    searchParams: {
        message: string,
        postal: string,
        society_postal: string,
        phone: string,
        siren_siret: string,
        certificate: string,
        pse: string,
        pro_insurance: string,
        pro_card: string,

    };
}) {

    const save = async (formData: FormData) => {
        'use server'

        console.log("coucou")

        const supabase = createClient();

        const nom = formData.get("nom") as string;
        const prenom = formData.get("prenom") as string;
        const phone = formData.get("phone") as string;
        const address = formData.get("address") as string;
        const city = formData.get("city") as string;
        const postal = formData.get("postal") as string;
        const siren_siret = formData.get("siren_siret") as string;
        const tva = formData.get("tva") as string;
        const society_address = formData.get("society_address") as string;
        const society_city = formData.get("society_city") as string;
        const society_postal = formData.get("society_postal") as string;
        const certificate = formData.get("certificate") as string;
        const parrainage = formData.get("parrain") as string;

        const file_siren_siret = formData.get("file_siren_siret") as File
        const file_certificate = formData.get("file_certificate") as File
        const file_pse = formData.get("file_pse") as File
        const file_insurance = formData.get("file_insurance") as File
        const file_pro_card = formData.get("file_pro_card") as File

        let redirect_messages = ''

        if (postal.length !== 5) {
            redirect_messages += '&postal=Renseignez un code postal valide'
        }
        if (society_postal.length !== 5) {
            redirect_messages += '&society_postal=Renseignez un code postal valide'
        }
        console.log(phone, String(Number(phone)))
        if (phone.replaceAll(' ', '').length !== 10) {
            redirect_messages += '&phone=Renseignez un numero de telephone valide'
        }

        if (file_siren_siret.size === 0) {
            redirect_messages += '&siren_siret=Renseignez un justificatif'
        }
        if (file_certificate.size === 0) {
            redirect_messages += '&certificate=Renseignez un justificatif'
        }
        if (file_pse.size === 0) {
            redirect_messages += '&pse=Renseignez un justificatif'
        }
        if (file_insurance.size === 0) {
            redirect_messages += '&pro_insurance=Renseignez un justificatif'
        }
        if (file_pro_card.size === 0) {
            redirect_messages += '&pro_card=Renseignez un justificatif'
        }

        if (redirect_messages.length > 0) {
            redirect_messages = "/first?message=Un champs n'est pas valide" + redirect_messages
            return redirect(redirect_messages)
        }

        const {data: {user}} = await supabase.auth.getUser()

        console.log(file_siren_siret)

        const extension_siren_siret = file_siren_siret.name.split('.').slice(-1)[0]
        const extension_certificate = file_certificate.name.split('.').slice(-1)[0]
        const extension_pse = file_pse.name.split('.').slice(-1)[0]
        const extension_insurance = file_insurance.name.split('.').slice(-1)[0]
        const extension_pro_card = file_pro_card.name.split('.').slice(-1)[0]

        const {data: dataSirenSiret, error: storrageErrorSirenSiret} = await supabase.storage.from('documents').upload(`siren_siret_${user?.id}.${extension_siren_siret}`, file_siren_siret)
        const {data: dataCertificate, error: storrageErrorCertificate} = await supabase.storage.from('documents').upload(`certificate_${user?.id}.${extension_certificate}`, file_certificate)
        const {data: dataPse, error: storrageErrorPse} = await supabase.storage.from('documents').upload(`pse_${user?.id}.${extension_pse}`, file_pse)
        const {data: dataInsurance, error: storrageErrorInsurance} = await supabase.storage.from('documents').upload(`insurance_${user?.id}.${extension_insurance}`, file_insurance)
        const {data: dataProCard, error: storrageErrorProCard} = await supabase.storage.from('documents').upload(`pro_card_${user?.id}.${extension_pro_card}`, file_pro_card)

        if (storrageErrorSirenSiret) {
            console.log("storrageErrorSirenSiret", storrageErrorSirenSiret)
        }
        if (storrageErrorCertificate) {
            console.log("storrageErrorCertificate", storrageErrorCertificate)
        }
        if (storrageErrorPse) {
            console.log("storrageErrorPse", storrageErrorPse)
        }
        if (storrageErrorInsurance) {
            console.log("storrageErrorInsurance", storrageErrorInsurance)
        }
        if (storrageErrorProCard) {
            console.log("storrageErrorProCard", storrageErrorProCard)
        }

        const {error} = await supabase
            .from('vacataire')
            .insert({
                id: user?.id,
                nom: nom,
                prenom: prenom,
                phone: phone,
                address: address,
                city: city,
                postal: postal,
                siren_siret: siren_siret,
                tva: tva,
                society_address: society_address,
                society_city: society_city,
                society_postal: society_postal,
                certificate: certificate,
                parrainage: parrainage,
                file_siren_siret: dataSirenSiret?.path,
                file_certificate: dataCertificate?.path,
                file_pse: dataPse?.path,
                file_insurance: dataInsurance?.path,
                file_pro_card: dataProCard?.path
            })

        if (error) {
            console.log(error)
        }

        return redirect("/vacataire/offres");
    }

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
            <div className="w-full p-8 z-auto grid justify-items-center">
                <h1 className="text-5xl font-black md:font-extrabold font-sans text-cente">Bienvenu !</h1>
            </div>
            <p className="mx-3 mb-3">Finalisation de l'inscription</p>
            <RegisterForm save={save} searchParams={searchParams}/>
        </div>
    )
}