import React from 'react';
import { auth } from "@/auth";
import DashboardSidebar from './_components/dashboard-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardNavbar from './_components/dashboard-navbar';
import { ApiRequests } from '@/lib/requests/api-requests';
import ProviderOnboarding from './_components/provider/onboarding';
import DashboardClientWrapper from './dashboard-client-wrapper';
import WorkspaceLoader from './_components/dashboard-provider';
import WorkspaceGate from './_components/dashboard-workspace-gate';


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

    const session = await auth();
    let workspace = null;

    if (session?.user?.role === "provider") {
        workspace = await ApiRequests.get("providers/workspace/", session?.accessToken, true);
        
    }


    return (
        <div className="bg-gray-50">
            <WorkspaceGate />
            <WorkspaceLoader data={workspace} />
            <SidebarProvider>
                <DashboardSidebar />
                <div className="w-full">
                    <div>
                        <DashboardNavbar />
                    </div>

                    <DashboardClientWrapper workspace={workspace}>
                        <main className="px-3 py-2 min-h-screen">
                            {children}
                        </main>
                    </DashboardClientWrapper>

                </div>
            </SidebarProvider>
        </div>
    );
}

export default DashboardLayout