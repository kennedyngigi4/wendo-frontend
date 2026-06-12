import React from 'react'
import HospitalDashboardClient from './page-client'
import { useWorkspaceStore } from '@/stores/workspaceStore';
import { ApiRequests } from '@/lib/requests/api-requests';
import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const page = async() => {
  const session = await auth();

  const cookiesStore = await cookies();
  const workspaceCookie = cookiesStore.get("activeWorkspace");
  const activeWorkspace = workspaceCookie ? JSON.parse(workspaceCookie.value) : null;


  // No workspace selected
  if (!activeWorkspace) {
    redirect("/dashboard/provider");
  }

  // Optional: ensure correct workspace type
  if (activeWorkspace.type !== "provider") {
    redirect("/dashboard/provider");
  }

  const data = await ApiRequests.get(`providers/hosi_dashboard/?branch_id=${activeWorkspace.id}`, session?.accessToken, true);

  return (
    <HospitalDashboardClient data={data} />
  )
}

export default page