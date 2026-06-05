
import React from 'react';
import ServiceForm from '@/app/dashboard/provider/_components/_services/service-form';
import { ApiRequests } from '@/lib/requests/api-requests';
import { auth } from '@/auth';
import { cookies } from 'next/headers';


type ServiceDetailsPops = {
  params: Promise<{
    id: string;
  }>;
}

const ServiceDetails = async({ params } : ServiceDetailsPops) => {
  const session = await auth();
  const { id } = await params;

  const cookiesStore = await cookies();
  const workspaceCookie = cookiesStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;
  
  const data = await ApiRequests.get(`services/offerings/${id}/?owner_type=branch&branch_id=${activeWorkspace.id}`, session?.accessToken, true);
  console.log(data);

  return (
    <div className="flex flex-col space-y-5 bg-white my-5 p-5 shadow rounded-xl"> 
      <div>
        <h1 className="text-secondary text-lg font-semibold">{data.service_name}</h1>
        <p className="text-slate-500 text-sm">Easily manage your service details and availability.</p>
      </div>

      <div>
        <ServiceForm id={id} data={data} branch_id={activeWorkspace.id} />
      </div>
    </div>
  )
}

export default ServiceDetails