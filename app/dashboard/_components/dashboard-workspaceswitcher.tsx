"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { Workspace } from "@/stores/workspaceStore";

export default function WorkspaceSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const [loading, setLoading] = useState(false);

    const workspaces = useWorkspaceStore((s) => s.workspaces);
    const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);
    const switchWorkspace = useWorkspaceStore((s) => s.switchWorkspace);
    const clearWorkspace = useWorkspaceStore((s) => s.clearWorkspace);

    // ✅ stop loader when route changes
    useEffect(() => {
        setLoading(false);
    }, [pathname]);

    const getRedirectUrl = (workspace: Workspace | null) => {
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

    const handleSwitch = (value: string) => {
        setLoading(true);

        if (value === "overview") {
            clearWorkspace();
            router.push("/dashboard/provider");
            return;
        }

        const selected = workspaces.find((w) => w.id === value);

        if (selected) {
            switchWorkspace(selected);
            router.push(getRedirectUrl(selected));
            return;
        }

        setLoading(false);
    };

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center">
                    <div className="bg-white px-6 py-4 rounded-lg shadow-md flex items-center gap-3">
                        <div className="h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm font-medium">Switching workspace...</p>
                    </div>
                </div>
            )}

            <div className="w-full">
                <select
                    value={activeWorkspace?.id || "overview"}
                    onChange={(e) => handleSwitch(e.target.value)}
                    className="w-full p-2 rounded-md border bg-white text-sm"
                    disabled={loading}
                >
                    <option value="overview">Overview Mode</option>

                    {workspaces.map((w) => (
                        <option key={`${w.type}-${w.id}`} value={w.id}>
                            {w.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}