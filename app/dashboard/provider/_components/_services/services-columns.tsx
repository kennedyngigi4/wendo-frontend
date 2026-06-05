"use client"

import { Button } from "@/components/ui/button"
import CustomButton from "@/components/ui/custom-button"
import { ServiceOfferingModel } from "@/lib/models/service-models"
import { useWorkspaceStore } from "@/stores/workspaceStore"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"


export const ServicesColumns: ColumnDef<ServiceOfferingModel>[] = [

    

    {
        accessorKey: "service_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Service
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "is_available",
        header: "Is Available",
        cell: ({row}) => {
            const available = row?.original.is_available;

            return (
                <div>
                    {available ? (<p className="text-green-600 text-sm">Available</p>) : (<p className="text-red-600 text-sm">Not Available</p>)}
                </div>
            );
        }
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            const price = row?.original.price;
            return (
                <p>{parseFloat(price).toLocaleString()}</p>
            )
        }
        
    },
    {
        accessorKey: "",
        header: "Action",
        cell: ({row}) => {
            const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);
            const id = row?.original.id;

            return (
                <Link href={`/dashboard/provider/${activeWorkspace.provider_type}/services/${id}`}>
                    
                    <CustomButton 
                        label="Manage"
                        btnType="button"
                        variant="outline"
                        size="xs"
                        className="px-3 py-2"
                    />
                </Link>
            )
        }
    },
]