"use client";

import { useEffect } from "react";
import { buildWorkspaces } from "@/lib/services/workspace-service";
import { useWorkspaceStore } from "@/stores/workspaceStore";

export default function WorkspaceLoader({ data }: { data: any }) {
    const setWorkspaces = useWorkspaceStore((s) => s.setWorkspaces);

    useEffect(() => {
        if (!data) return;

        const workspaces = [];

        if (data.professional) {
            workspaces.push({
                type: "professional",
                id: data.professional.id,
                name: "Professional Account",
                provider_type: "professional"
            });
        }

        if (data.organizations?.length > 0) {
            data.organizations.forEach((org: any) => {
                workspaces.push({
                    type: "provider",
                    id: org.id,
                    name: org.name,
                    provider_type: org.provider_type,
                });
            });
        }

        setWorkspaces(workspaces);
    }, [data, setWorkspaces]);

    return null;
}