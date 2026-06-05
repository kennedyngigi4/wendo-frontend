"use client"

import CustomButton from "@/components/ui/custom-button"
import { ProviderBranchList } from "@/lib/models/provider-models"
import { ColumnDef } from "@tanstack/react-table"
import { PlusIcon, Settings2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const Branchescolumns: ColumnDef<ProviderBranchList>[] = [
    {
        accessorKey: "name",
        header: "Branch",
        cell: ({ row}) => {
            const company = row.original;
            return(
                <div className="flex space-x-3 items-center">
                    {/* <div className="relative h-[50px] w-[50px]">
                        <Image src={company.logo} alt="Logo" fill className="object-contain"  />
                    </div> */}
                    <div>
                        <h3 className="font-semibold">{company.name}</h3>
                        <p className="text-xs text-slate-500">{company.provider}</p>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "is_main_branch",
        header: "Is Main Branch?",
        cell: ({row}) => {
            const branch = row?.original?.is_main_branch;

            return(
                <div className="capitalize">{branch ? 
                    (<div className="bg-green-200 border-2 border-green-400 px-6 py-0.5 text-xs rounded-2xl w-fit">Main</div>) 
                    : 
                    (<div className="bg-primary/20 border-2 border-primary/60 px-6 py-0.5 text-xs rounded-2xl w-fit">Branch</div>)}
                </div>
            )
        }
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "location_name",
        header: "Location",
    },
    {
        accessorKey: "",
        header: "Action",
        cell: ({row}) => {
            const company = row?.original;

            return(
                <div className="flex items-center space-x-4">
                    <div>
                        <CustomButton size="xs" variant="outline" prefixIcon={{ type: "lucide", icon: Settings2Icon }} className="px-2.5 text-xs py-4" label="Manage" btnType="button" />
                    </div>
                </div>
            )
        }
    },
]