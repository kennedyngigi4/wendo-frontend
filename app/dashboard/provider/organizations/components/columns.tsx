"use client"

import { Button } from "@/components/ui/button"
import CustomButton from "@/components/ui/custom-button"
import { ProviderList } from "@/lib/models/provider-models"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, PlusIcon, Settings2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const columns: ColumnDef<ProviderList>[] = [
    {
        accessorKey: "name",
        header: "Company",
        cell: ({ row}) => {
            const company = row.original;
            return(
                <div className="flex space-x-3 items-center">
                    <div className="relative h-[50px] w-[50px]">
                        <Image src={company.logo} alt="Logo" fill className="object-contain"  />
                    </div>
                    <div>
                        <h3 className="font-semibold">{company.name}</h3>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "provider_type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({row}) => {
            const type = row?.original?.provider_type;

            return(
                <p className="capitalize">{type}</p>
            )
        }
    },
    {
        accessorKey: "total_branches",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Branches
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "",
        header: "Action",
        cell: ({row}) => {
            const company = row?.original;

            return(
                <div className="flex items-center space-x-4">
                    <div>
                        <Link href={`/dashboard/provider/organizations/${company.id}/branches/new`}>
                        <CustomButton variant="outline" size="xs" prefixIcon={{ type: "lucide", icon: PlusIcon }} className="px-2.5 text-xs py-4" label="Add Branch" btnType="button" />
                        </Link>
                    </div>

                    <div>
                        <CustomButton size="xs" prefixIcon={{ type: "lucide", icon: Settings2Icon }} className="px-2.5 text-xs py-4" label="Manage" btnType="button" />
                    </div>
                </div>
            )
        }
    },
]