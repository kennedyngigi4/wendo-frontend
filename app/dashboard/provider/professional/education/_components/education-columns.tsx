"use client"

import CustomButton from "@/components/ui/custom-button"
import { ColumnDef } from "@tanstack/react-table"
import { Trash2Icon } from "lucide-react"


export type Education = {
    id: string
    degree: string
    institution: string
    year_completed: string
}

export const EducationColumns: ColumnDef<Education>[] = [
    {
        accessorKey: "degree",
        header: "Degree",
    },
    {
        accessorKey: "institution",
        header: "Institution",
    },
    {
        accessorKey: "year_completed",
        header: "Year Graduated",
    },
    {
        accessorKey: "",
        header: "Action",
        cell: ({row}) => {

            return(
                <CustomButton 
                    label="Delete"
                    btnType="button"
                    size="xs"
                    className="px-3 py-4"
                    variant="secondary"
                    prefixIcon={{ type: "lucide", icon: Trash2Icon }}
                    
                />
            );
        }
    },
]