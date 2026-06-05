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

