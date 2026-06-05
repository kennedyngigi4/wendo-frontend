"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import Cookies from "js-cookie";

export default function WorkspaceGate() {
    const router = useRouter();
    const pathname = usePathname();

    const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);
    const { clearWorkspace, setActiveWorkspace,} = useWorkspaceStore();

    const getRedirectUrl = (workspace: any) => {
        if (!workspace) return "/dashboard/provider";

        if (workspace.type === "professional") return "/dashboard/provider/professional";

        if (workspace.type === "provider") {
            if (workspace.provider_type === "hospital" || workspace.provider_type === "clinic")
                return "/dashboard/provider/hospital";
            if (workspace.provider_type === "ambulance")
                return "/dashboard/provider/ambulance";

            return "/dashboard/provider";
        }

        return "/dashboard/provider";
    };


    useEffect(() => {
        const stored = Cookies.get("activeWorkspace");

        // Cookie missing
        if (!stored) {
            clearWorkspace();

            router.replace("/dashboard/provider");
            return;
        }

        try {
            const parsed = JSON.parse(stored);

            // Sync Zustand if needed
            if (!activeWorkspace) {
                setActiveWorkspace(parsed);
            }
        } catch {
            clearWorkspace();
            Cookies.remove("activeWorkspace");

            router.replace("/dashboard/provider");
        }
    }, []);

    useEffect(() => {
        if (!activeWorkspace) return;

        const expectedRoute = getRedirectUrl(activeWorkspace);

        
        if (pathname === "/dashboard/provider") {
            router.replace(expectedRoute);
        }
    }, [activeWorkspace, pathname]);

    return null;
}