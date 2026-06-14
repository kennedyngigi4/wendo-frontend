import { OperatingHours } from "./profession-models";
import { ServiceOfferingModel, SpecialtyModel } from "./service-models";


export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}


export interface HospitalProfileModel{
    id: string;
    level: string;
    level_display: string;
    accepts_nhif: boolean;
    has_pharmacy: boolean;
    year_established: string;
    has_emergency: boolean;
}

export interface ProviderCard {
    id: string
    name: string
    slug: string
    provider_type: string
    email: string
    website: string
    country: string
    logo: string
    description: string
    is_verified: boolean
}



export interface ProviderBranchCard {
    id: string;
    name: string;
    slug: string
    phone: string;
    is_main_branch: string;
    location_name: string;
    banner: string;
    is_open: boolean;
    accepts_nhif?: boolean;
    rating?: any;
    provider_type?: string
    availability?: any
    has_ambulance?: any
    ownership_type?: string
    level?: string
    has_pharmacy?: any
}



export interface ProviderBranchDetailsModel {
    id: string
    name: string
    slug: string
    phone: string
    is_main_branch: string
    location_name: string
    latitude?: string
    longitude?: string
    banner: string
    provider: ProviderCard
    is_open: boolean
    rating: any
    reviews_count: any
    profile: HospitalProfileModel
    services: ServiceOfferingModel[]
    clinics: any[]
    availability: any
    operating_hours: OperatingHours[]
    reviews?: any[]
}


export interface SpecialistCardModel {
    id: string
    title: string
    name: string
    profession: string
    photo: string
}


export interface SpecialistDetailsModel {
    id: string
    title: string
    name: string
    profession: string
    photo: string
    specialties: SpecialtyModel[]
    bio: string
}

export interface ClinicCardModel {
    id: string
    title: string
    days_of_week: string
    start_time: string
    end_time: string
    banner: string
}

export interface ClinicDetailsModel {
    id: string
    title: string
    days_of_week: string
    consultation_fee?: any
    start_time: string
    end_time: string
    banner: string
    description: string
}



