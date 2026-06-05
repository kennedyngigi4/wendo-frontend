import React from 'react'
import DoctorClientDetails from './page-client'
import { ApiRequests } from '@/lib/requests/api-requests';
import { Metadata } from 'next';
import { CONSTANTS } from '@/lib/constants/constants';
import { capitalizeWord } from '@/lib/helpers/text-formatter';


type Props = {
    params: Promise<{
        slug: any;
    }>
}

const formatSpecialties = (specialties?: string[]) => {
    if (!specialties || specialties.length === 0) return "";

    return specialties.slice(0, 3).join(", ");
};

// SEO METADATA
export async function generateMetadata({ params }: Props): Promise<Metadata>{
    const { slug } = await params;

    const specialist = await ApiRequests.get(
        `professionals/professional_details/${slug}/`,
        "",
        true
    );

    if(!specialist?.name){
        return {
            title: "Doctor Not Found",
            description: "The requested doctor profile does not exist.",
        };
    }


    const specialties = formatSpecialties(specialist?.specialties);

    return {
        title: specialties
            ? `${capitalizeWord(specialist.title)}. ${specialist.name} | ${specialties}, ${specialist.location_name}`
            : `Dr. ${specialist.name} | Medical Professional`,

        description: `${specialist.name} specializes in ${specialties || "general healthcare"
            }. View profile, availability, and book consultation. ${CONSTANTS.keywords}`,
    };
}

const page = async({ params }: Props) => {
    const { slug } = await params;
    
    const data = await ApiRequests.get(`professionals/professional_details/${slug}/`, "", true);
     

    return (
        <DoctorClientDetails data={data} />
    );
}

export default page