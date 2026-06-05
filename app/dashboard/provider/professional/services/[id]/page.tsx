import React from 'react'
import ServiceForm from '../../../_components/_services/service-form';
import { ApiRequests } from '@/lib/requests/api-requests';
import { auth } from '@/auth';
import { cookies } from 'next/headers';


type ProfessionalServiceDetailsProps = {
  params: Promise<{
    id: string;
  }>;
}


const ProfessionalServiceDetails = async ({ params }: ProfessionalServiceDetailsProps) => {
  const session = await auth();
  const { id } = await params;

  const cookiesStore = await cookies();
  const workspaceCookie = cookiesStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;

  const data = await ApiRequests.get(`services/offerings/${id}/?owner_type=professional&professional_id=${activeWorkspace.id}`, session?.accessToken, true);
  console.log(data);

  return (
    <div className="flex flex-col space-y-5 bg-white my-5 p-5 shadow rounded-xl">
      <div>
        <h1 className="text-secondary text-lg font-semibold">Edit Service</h1>
        <h1 className="text-secondary font-semibold">{data.service_name}</h1>
        <p className="text-slate-500 text-sm">Easily manage your service details and availability.</p>
      </div>

      <div>
        <ServiceForm id={id} data={data} />
      </div>
    </div>
  )
}

export default ProfessionalServiceDetails