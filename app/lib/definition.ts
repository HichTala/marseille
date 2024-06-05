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
    piscine: Piscine | null;
}

export type Vacataire = {
    id: string;
    nom: string;
    prenom: string;
    scores: string;
    certificate: string;
}

export type Piscine = {
    id: string;
    score: string;
    address: string;
    city: string;
    name: string;
}

export type Mission = {
    id: string;
    created_at: string;
    user_id: string;
    status: string;
    price: number;
    offer_id: string;
    offer: Offer | null
}