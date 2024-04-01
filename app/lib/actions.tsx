'use server'

import {z} from 'zod';
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const FormSchemaMission = z.object({
    id: z.string(),
    price: z.coerce
        .number()
        .gt(0, {message: "Veuillez entrer un prix supérieur à 0€."}),
    contract: z.enum(['on'], {
        invalid_type_error: "Veuillez acceptez les termes et conditions..."
    }),
    date: z.string(),
})

const CreateMission = FormSchemaMission.omit({id: true, date: true})

export type StateMission = {
    errors?: {
        price?: string[];
        contract?: string[];
    };
    message?: string | null;
}

export async function createMission(
    prevState: StateMission,
    formData: FormData,
) {
    const validatedFields = CreateMission.safeParse({
        price: formData.get("price"),
        contract: formData.get("contract"),
    });
    console.log(formData.get("contract") === 'on')

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Des champs sont manquant, veuillez à tout remplir correctement"
        }
    }

    const {price, contract} = validatedFields.data
    const priceInCents = price * 100;

    const offer_id = formData.get("offer_id");

    const supabase = createServerComponentClient({cookies})
    const {data: offers} = await supabase.from("offres").select().eq("id", offer_id)

    const {error} = await supabase
        .from('missions')
        .upsert({
            'piscine_id': offers?.at(0)['piscine_id'],
            'date': offers?.at(0)['date'],
            'duration': offers?.at(0)['duration'],
            'status': 0,
            'start': offers?.at(0)['start'],
            'end': offers?.at(0)['end'],
            'description': offers?.at(0)['description'],
            'certificate': offers?.at(0)['certificate'],
            'name': offers?.at(0)['name'],
            'address': offers?.at(0)['address'],
            'city': offers?.at(0)['city'],
            'supervisor': offers?.at(0)['supervisor'],
            'price': priceInCents
        })
    console.log(error)
//     Status: {'pending': 0, 'rejected': 1, 'accepted': 2, 'done': 3}
    if (error) {
        return {
            message: "Erreur de base de donnée: la mission n'a pas pu être créer"
        }
    }

    revalidatePath('/vacataire/offres')
    redirect('/vacataire/offres');
}

const FormSchemaOffer = z.object({
    certificate: z.string({invalid_type_error: "Veuillez entrer un diplôme"}),
    date: z.string({invalid_type_error: "Veuillez entrer une date"}),
    duration: z.string({invalid_type_error: "Veuillez entrer une durée"}),
    start: z.string({invalid_type_error: "Veuillez entrer une heure de début"}),
    end: z.string({invalid_type_error: "Veuillez entrer une heure de fin"}),
    description: z.string()
})

const CreateOffer = FormSchemaOffer

export type StateOffer = {
    errors?: {
        certificate?: string[],
        date?: string[];
        duration?: string[];
        start?: string[];
        end?: string[];
        description?: string[]
    };
    message?: string | null;
}

export async function createOffer(
    prevState: StateOffer,
    formData: FormData
) {
    const validatedFields = CreateOffer.safeParse({
        certificate: formData.get("certificate"),
        date: formData.get("date"),
        duration: formData.get("duration"),
        start: formData.get("start"),
        end: formData.get("end"),
        description: formData.get("description")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Des champs sont manquant, veuillez à tout remplir correctement"
        }
    }

    const {certificate, date, duration, start, end, description} = validatedFields.data

    const supabase = createServerComponentClient({cookies})
    const {data: piscine} = await supabase.from("piscine").select()
    console.log(date)

    const {error} = await supabase
        .from('offres')
        .upsert({
            'date': date,
            'duration': duration,
            'start': start,
            'end': end,
            'description': description,
            'certificate': certificate,
            'name': piscine?.at(0)['name'],
            'address': piscine?.at(0)['address'],
            'city': piscine?.at(0)['city'],
            'score': piscine?.at(0)['piscine']
        })
    console.log(error)
//     Status: {'pending': 0, 'rejected': 1, 'accepted': 2, 'done': 3}
    if (error) {
        return {
            message: "Erreur de base de donnée: l'offre n'a pas pu être créer"
        }
    }

    revalidatePath('/piscine/jobs')
    redirect('/piscine/jobs');

}
