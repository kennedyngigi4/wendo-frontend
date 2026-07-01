import { ServiceOfferingModel } from "./service-models";

export interface BookingModel {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: ServiceOfferingModel;
    status: string;
}


export interface BookingDetailsModel {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: ServiceOfferingModel;
    status: string;
    reason: string;
    appointment_datetime: any;
}


export interface PatientBookingModel{
    id: string
    service: ServiceOfferingModel
    status: string
    professional_name?: string
    branch_name?: string
    provider_name?: string
    appointment_date: string
    appointment_time: string
    created_at: string
}

