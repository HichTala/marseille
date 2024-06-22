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
    state: number;
    available: number;
    vacataire: Vacataire | null;
    piscine: Piscine | null;
}

export type Vacataire = {
    id: string;
    nom: string;
    prenom: string;
    scores: string;
    certificate: string;
    phone: string;
    avatar: string;
    file_siren_siret: string;
    file_certificate: string;
    file_pse: string;
    file_insurance: string;
    file_pro_card: string;
}

export type Piscine = {
    id: string;
    score: string;
    address: string;
    city: string;
    name: string;
    group: string;
}

export type Mission = {
    id: string;
    created_at: string;
    user_id: string;
    status: string;
    price: number;
    offer_id: string;
    offres: Offer | null;
    vacataire: Vacataire;
}