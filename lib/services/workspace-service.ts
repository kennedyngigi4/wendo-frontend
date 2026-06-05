import { Workspace } from "@/stores/workspaceStore";

export function buildWorkspaces(data: any): Workspace[] {
    const workspaces: Workspace[] = [];

    if (data.professional) {
        workspaces.push({
            type: "professional",
            id: data.professional.id,
            name: "Professional Account",
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

    return workspaces;
}