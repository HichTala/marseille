'use server'

import {z} from 'zod';
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    price: z.coerce
        .number()
        .gt(0, {message: "Veuillez entrer un prix supérieur à 0€."}),
    contract: z.enum(['on'],{
            invalid_type_error: "Veuillez acceptez les termes et conditions..."
        }),
    date: z.string(),
})

const CreateMission = FormSchema.omit({id: true, date: true})

export type State = {
    errors?: {
        price?: string[];
        contract?: string[];
    };
    message?: string | null;
}

export async function createMission(
    prevState: State,
    formData: FormData,
){
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
            'date':  offers?.at(0)['date'],
            'duration':  offers?.at(0)['duration'],
            'status': 0,
            'start':  offers?.at(0)['start'],
            'end':  offers?.at(0)['end'],
            'description':  offers?.at(0)['description'],
            'certificate':  offers?.at(0)['certificate'],
            'name':  offers?.at(0)['name'],
            'address':  offers?.at(0)['address'],
            'city':  offers?.at(0)['city'],
            'supervisor':  offers?.at(0)['supervisor'],
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
