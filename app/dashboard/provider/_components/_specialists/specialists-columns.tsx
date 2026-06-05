"use client"

import { Button } from "@/components/ui/button"
import CustomButton from "@/components/ui/custom-button"
import { SpecialistCardModel } from "@/lib/models/provider-models"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const SpecialistsColumns: ColumnDef<SpecialistCardModel>[] = [
    {
        accessorKey: "photo",
        header: "Specialist",
        cell: ({ row }) => {

            const photo = row?.original.photo;
            

            return (
                <Image src={photo} alt={`Specialist`} unoptimized width={100} height={100} />
            )
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Full Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {

            const title = row?.original.title;
            const name = row?.original.name;

            return (
                <p className="capitalize">{title} {name}</p>
            )
        }
    },
    {
        accessorKey: "profession",
        header: "Profession",
    },
    {
        accessorKey: "",
        header: "Action",
        cell: ({row}) => {
            
            const id = row?.original.id;

            return (
                <Link href={`/dashboard/provider/hospital/specialists/${id}`}>
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