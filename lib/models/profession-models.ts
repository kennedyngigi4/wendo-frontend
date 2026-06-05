import { ServiceOfferingModel } from "./service-models";

export interface ProfessionType {
    id: string;
    name: string;
    icon: string;
}


export interface Specialty {
    id: string;
    name: string;
}

export interface EducationModel {
    id: string
    degree: string
    institution: string
    year_completed: string
}


export interface OperatingHours {
    id: string
    open_time: string
    close_time: string
    is_closed: boolean
    is_24: boolean
    day_of_week: string
}


export interface ProfessionalHomeModel {
    id:  string 
    slug: string
    name: string
    title: string
    years_of_experience: number 
    professional_type: string
    specialties: string[]
    profile_photo: string
    accepts_nhif: boolean
    rating: string
    availability: any
}

export interface ProfessionalCardModel {
    id: string;
    slug: string
    name: string;
    title: string;
    profile_photo: string;
    years_of_experience: string;
    rating: string;
    specialties: string[];
    next_available: string;
    consultation_fee: string;
    professional_type: string;
    availability: any
}


export interface ProfessionalDetailsModel {
    id: string;
    slug: string
    name: string;
    title: string;
    profile_photo: string;
    years_of_experience: string;
    rating: string;
    specialties: string[];
    next_available: string;
    consultation_fee: string;
    professional_type: string;
    accepts_nhif: boolean
    bio: string
    is_verified: string
    services: ServiceOfferingModel[]
    education: EducationModel[]
    location_name: string
    latitude: any
    longitude: any
    gender: string
    phone: string
    email: string
    website: string
    operating_hours: OperatingHours[]
    reviews?: any[]
}



