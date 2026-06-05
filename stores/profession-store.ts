import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ApiRequests } from "@/lib/requests/api-requests";
import { ProfessionType, Specialty } from "@/lib/models/profession-models";


type ProfessionStore = {
    professions: ProfessionType[]
    loading: boolean
    lastFetched: number | null

    fetchData: () => Promise<void>
    clearCache: () => void
}


const CACHE_DAYS = 1
const CACHE_TIME = CACHE_DAYS * 24 * 60 * 60 * 1000

export const useProfessionStore = create<ProfessionStore>()(
    persist(
        (set, get) => ({
            professions: [],
            loading: false,
            lastFetched: null,

            fetchData: async() => {
                const { lastFetched, professions } = get();

                // already cached and valid
                if(lastFetched && Date.now() - lastFetched < CACHE_TIME && professions.length > 0){
                    return;
                }

                set({ loading: true });
                try{
                    const [professionsResp] = await Promise.all([
                        ApiRequests.get("professionals/types/"),
                    ]);

                    console.log(professionsResp);
                    
                    set({
                        professions: professionsResp,
                        lastFetched: Date.now(),
                    })
                } catch(error){
                    console.log(error);
                } finally {
                    set({ loading: false })
                }
            },

            clearCache: () => {
                set({
                    professions: [],
                    lastFetched: null,
                })
            },

            


        }),
        {
            name: "profession-cache",
            partialize: (state) => ({
                professions: state.professions,
                lastFetched: state.lastFetched,
            })
        }
    )
)


