export type Offer = {
    id: string;
    created_at: string;
    piscine_id: string;
    user_id: string;
    description: string;
    certificate: string;
    supervisor: string;
    duration: string;
    startDatetime: string;
    endDatetime: string;
    state: string;
    vacataire: Vacataire | null;
}

export type Vacataire = {
    id: string;
    nom: string;
    prenom: string;
    scores: string;
    certificate: string;
}