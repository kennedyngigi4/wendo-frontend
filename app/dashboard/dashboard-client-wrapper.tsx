"use client";

import ProviderOnboarding from "./_components/provider/onboarding";



export default function DashboardClientWrapper({ workspace, children }: { workspace: any; children: React.ReactNode; }) {
    const showOnboarding =
        workspace?.professional === null &&
        workspace?.organizations?.length === 0;

    return (
        <>
            {showOnboarding && <ProviderOnboarding open={true} />}
            {children}
        </>
    );
}