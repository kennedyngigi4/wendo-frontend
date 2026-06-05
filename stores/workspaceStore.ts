import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";


export type WorkspaceType = "professional" | "provider";

export interface Workspace {
    type: WorkspaceType;
    id: string;
    name: string;
    provider_type?: string;
}

interface WorkspaceState {
    activeWorkspace: Workspace | null;
    workspaces: Workspace[];

    setWorkspaces: (workspaces: Workspace[]) => void;
    setActiveWorkspace: (workspace: Workspace | null) => void;
    switchWorkspace: (workspace: Workspace) => void;
    clearWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
    persist(
        (set, get) => ({
            activeWorkspace: null,
            workspaces: [],

            setWorkspaces: (workspaces) =>
                set((state) => {
                    const active = state.activeWorkspace;

                    const stillExists = active
                        ? workspaces.find((w) => w.id === active.id && w.type === active.type)
                        : null;

                    return {
                        workspaces,
                        activeWorkspace: stillExists || null, // DO NOT default select
                    };
                }),

            setActiveWorkspace: (workspace) => {
                
                if(workspace){
                    Cookies.set("activeWorkspace", JSON.stringify(workspace));
                } else {
                    Cookies.remove("activeWorkspace");
                }

                set({ activeWorkspace: workspace })
            },

            switchWorkspace: (workspace) => {
                Cookies.set("activeWorkspace", JSON.stringify(workspace));

                set({ activeWorkspace: workspace });
            },

            clearWorkspace: () => {
                Cookies.remove("activeWorkspace");
                set({ activeWorkspace: null })
            },
        }),
        {
            name: "afyhub-workspace-store",
            partialize: (state) => ({ activeWorkspace: state.activeWorkspace }),
        }
    )
);



if (typeof window !== "undefined") {
    const stored = Cookies.get("activeWorkspace");

    if (stored) {
        try {
            useWorkspaceStore.setState({
                activeWorkspace: JSON.parse(stored),
            });
        } catch {
            Cookies.remove("activeWorkspace");

            useWorkspaceStore.setState({
                activeWorkspace: null,
            });
        }
    } else {
        // Cookie missing -> clear persisted workspace too
        useWorkspaceStore.setState({
            activeWorkspace: null,
        });
    }
}



