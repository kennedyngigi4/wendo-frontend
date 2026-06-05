"use client"

import { Button } from "@/components/ui/button"
import CustomButton from "@/components/ui/custom-button"
import { ClinicCardModel } from "@/lib/models/provider-models"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"


const WEEK_DAYS_MAP: Record<string | number, string> = {
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    7: "Sun",
};

export const ClinicsColumns: ColumnDef<ClinicCardModel>[] = [
    {
        accessorKey: "banner",
        header: "Clinic",
        cell: ({ row }) => {

            const photo = row?.original.banner;
            

            return (
                <Image src={photo} alt={`Specialist`} unoptimized width={100} height={100} />
            )
        }
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "days_of_week",
        header: "Clinic Days",
        cell: ({ row }) => {
            const days = row?.original.days_of_week || [];

            return (
                <div className="flex flex-wrap gap-3">
                    {days.map((d) => (
                        <span
                            key={d}
                            className="px-2 py-1 text-xs rounded-md bg-blue-50"
                        >
                            {WEEK_DAYS_MAP[d] ?? d}
                        </span>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: "",
        header: "Action",
        cell: ({row}) => {
            
            const id = row?.original.id;

            return (
                <Link href={`/dashboard/provider/hospital/clinics/${id}`}>
                    <CustomButton 
                        label="Manage"
                        btnType="button"
                        variant="outline"
                        size="xs"
                        className="px-3 py-3.5"
                    />
                </Link>
            )
        }
    },
]