export interface ServiceCategoryModel {
    id: string;
    name: string;
    slug: string;
    icon: string
}

export interface ServiceModel {
    id: string;
    name: string;
    slug: string;
    icon: string;
    category: ServiceCategoryModel
}


export interface ServiceOfferingModel {
    id: string;
    service_name: string;
    is_available: boolean;
    description: string;
    price: string;
    service: ServiceModel;
}


export interface SpecialtyModel {
    id: string;
    name: string;
}

export interface ServiceOfferingDetailsModel {
    id: string;
    serviceCategory: string;
    service_name: string;
    service: string;
    price: string;
    description: string;
    is_available: boolean;
}




