'use server'

import {z} from 'zod';
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {Mission, Offer} from "@/app/lib/definition";

const FormSchemaMission = z.object({
    id: z.string(),
    price: z.coerce
        .number()
        .gt(0, {message: "Veuillez entrer un prix supérieur à 0€."}),
    contract: z.enum([''], {
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

    const {error} = await supabase
        .from('missions')
        .upsert({
            'offer_id': offer_id,
            'status': 0,
            'price': priceInCents
        })
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
    certificate: z.string(),
    date: z.string(),
    duration: z.string(),
    start: z.string(),
    end: z.string(),
    description: z.string(),
    nb_vacataire: z.string(),
    supervisor: z.string()
})

const CreateOffer = FormSchemaOffer

export type StateOffer = {
    errors?: {
        certificate?: string[],
        date?: string[];
        duration?: string[];
        start?: string[];
        end?: string[];
        description?: string[];
        nb_vacataire?: string[];
        supervisor?: string[]
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
        description: formData.get("description"),
        nb_vacataire: formData.get("nb_vacataire"),
        supervisor: formData.get("supervisor")
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Des champs sont manquant, veuillez à tout remplir correctement"
        }
    }

    const {certificate, date, duration, start, end, description, nb_vacataire, supervisor} = validatedFields.data

    const supabase = createServerComponentClient({cookies})

    for (let i = 0; i < Number(nb_vacataire); i++) {
        const {error} = await supabase
            .from('offres')
            .upsert({
                'startDatetime': new Date(date + ' ' + start),
                'endDatetime': new Date(date + ' ' + end),
                'duration': duration,
                'description': description.length != 0 ? description : null,
                'certificate': certificate,
                'supervisor': supervisor.length != 0 ? supervisor : null,
            })
        console.log(error)
        if (error) {
            return {
                message: "Erreur de base de donnée: l'offre n'a pas pu être créer"
            }
        }
    }

    revalidatePath('/piscine/jobs')
    redirect('/piscine/jobs');

}

export async function acceptVac({mission}: { mission: Mission }) {
    const supabase = createServerComponentClient({cookies})
    const {error} = await supabase
        .from('missions')
        .update({
            status: 1
        })
        .eq("id", mission.id)

    console.log(error)
    if (error) {
        return {
            message: "Erreur de base de donnée: l'offre n'a pas pu être créer"
        }
    }

    const {error: offres} = await supabase
        .from('offres')
        .update({
            user_id: mission.user_id,
            state: 1
        })
        .eq("id", mission.offres?.id)

    console.log(offres)
    if (offres) {
        return {
            message: "Erreur de base de donnée: l'offre n'a pas pu être créer"
        }
    }
}

export async function rejectVac({mission}: { mission: Mission }) {
    const supabase = createServerComponentClient({cookies})
    const {error} = await supabase
        .from('missions')
        .update({
            status: 4
        })
        .eq("id", mission.id)

    console.log(error)
    if (error) {
        return {
            message: "Erreur de base de donnée: l'offre n'a pas pu être créer"
        }
    }
}

export async function validationVac({offer, stars}: { offer: Offer, stars: number }) {
    const supabase = createServerComponentClient({cookies})
    const {error} = await supabase
        .from('offres')
        .update({
            state: 2
        })
        .eq("id", offer.id)
    console.log(error)
    if (error) {
        return {
            message: "Erreur de base de donnée: l'offre n'a pas pu être créer"
        }
    }

    const {error: missions1} = await supabase
        .from('missions')
        .update({
            status: 4
        })
        .eq("offer_id", offer.id)
        .neq("user_id", offer.user_id)
    console.log(missions1)
    if (missions1) {
        return {
            message: "Erreur de base de donnée: l'offre n'a pas pu être créer"
        }
    }

    const {error: missions2} = await supabase
        .from('missions')
        .update({
            status: 2
        })
        .eq("offer_id", offer.id)
        .eq("user_id", offer.user_id)
    console.log(missions2)
    if (missions2) {
        return {
            message: "Erreur de base de donnée: l'offre n'a pas pu être créer"
        }
    }

    const {data: vacataires} = await supabase
        .from('vacataire')
        .select('nb_mission, scores')
        .eq("id", offer.user_id)

    const {error: error_vacataire} = await supabase
        .from('vacataire')
        .update({
            nb_mission: vacataires?.at(0)?.nb_mission+1,
            scores: vacataires?.at(0)?.scores ? (vacataires?.at(0)?.scores + stars/vacataires?.at(0)?.nb_mission)*(vacataires?.at(0)?.nb_mission+1) : stars
        })
        .eq("id", offer.user_id)

    console.log(error_vacataire)
    if (error_vacataire) {
        return {
            message: "Erreur de base de donnée: l'offre n'a pas pu être créer"
        }
    }

}