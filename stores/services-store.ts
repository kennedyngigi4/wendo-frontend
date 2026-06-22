import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ApiRequests } from "@/lib/requests/api-requests";
import { ServiceCategoryModel, ServiceModel, SpecialtyModel } from "@/lib/models/service-models";


type ServicesStore = {
    servicecategories: ServiceCategoryModel[]
    services: ServiceModel[]
    specialties: SpecialtyModel[]
    loading: boolean
    lastFetched: number | null

    fetchData: () => Promise<void>
    clearCache: () => void
}


const CACHE_DAYS = 1
const CACHE_TIME = CACHE_DAYS * 24 * 60 * 60 * 1000

export const useServicesStore = create<ServicesStore>()(
    persist(
        (set, get) => ({
            servicecategories: [],
            services: [],
            specialties: [],
            loading: false,
            lastFetched: null,

            fetchData: async() => {
                const { lastFetched, servicecategories, services, specialties } = get();

                // already cached and valid
                if (lastFetched && Date.now() - lastFetched < CACHE_TIME && servicecategories.length > 0 && services.length > 0 && specialties.length > 0){
                    return;
                }

                set({ loading: true });
                try{
                    const [categoriesResp, servicesResp, specialtiesResp] = await Promise.all([
                        ApiRequests.get("services/categories/"),
                        ApiRequests.get("services/all/"),
                        ApiRequests.get("services/specialties/")
                    ]);

                    
                    
                    set({
                        servicecategories: categoriesResp,
                        services: servicesResp,
                        specialties: specialtiesResp,
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
                    servicecategories: [],
                    services: [],
                    specialties: [],
                    lastFetched: null,
                })
            },

            
        }),
        {
            name: "services-cache",
            partialize: (state) => ({
                servicecategories: state.servicecategories,
                services: state.services,
                specialties: state.specialties,
                lastFetched: state.lastFetched,
            })
        }
    )
)


