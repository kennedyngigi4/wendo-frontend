import React from 'react'
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { ApiRequests } from '@/lib/requests/api-requests';
import ProviderBookingForm from '../../../_components/_bookings/provider-booking-form';

type ProfessionalBookingDetailsProps = {
    params: Promise<{
        id: string
    }>;
} 

const ProfessionalBookingDetails = async ({ params }: ProfessionalBookingDetailsProps) => {
    const session = await auth();
    const cookieStore = await cookies();
    const workspaceCookie = cookieStore.get("activeWorkspace");
    const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;

    const { id } = await params;

    const data = await ApiRequests.get(`bookings/provprof_bookings/${id}/?owner_type=professional&professional_id=${activeWorkspace.id}`, session?.accessToken, true);



    return (
        <div className="bg-white p-5 my-5 shadow rounded-xl space-y-5">
            <div>
                <h1 className="text-secondary font-semibold text-lg capitalize">Booking details</h1>
                <p className="text-slate"></p>

                <div className="py-5 space-y-2 text-slate-600 text-sm capitalize">
                    <p><strong>Patient:</strong> {data.name}</p>
                    <p><strong>Service:</strong> {data.service.service_name}</p>
                    <p><strong>Phone:</strong> {data.phone}</p>
                    <p><strong>Date:</strong> {data.appointment_date}</p>
                    <p><strong>Time:</strong> {data.appointment_time}</p>
                    <p><strong>Status:</strong> {data.status}</p>
                </div>
            </div>

            <ProviderBookingForm id={id} data={data} branch_id={activeWorkspace.id} />
        </div>
    )
}

export default ProfessionalBookingDetails