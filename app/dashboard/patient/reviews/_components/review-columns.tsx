"use client"


import CustomButton from "@/components/ui/custom-button";
import { PatientReviewModel } from "@/lib/models/review-models";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import { Star, Trash2Icon } from "lucide-react";


export const reviewColumns: ColumnDef<PatientReviewModel>[] = [
    
    {
        accessorKey: "created_at",
        header: "Date Created",
        cell: ({row}) => {
            const dateFormatted = new Date(row?.original?.created_at).toLocaleDateString(
                "en-us", { "year": "numeric", "month": "short", "day": "numeric"});

            return (
                <p>{dateFormatted}</p>
            )
        }
    },
    {
        id: "provider",
        accessorFn: (row) => row.provider_branch ?? row.professional ?? "",
        header: "Provider",
        cell: ({row}) => {

            const branch = row?.original?.provider_branch;
            const professional = row?.original?.professional;

            return (
                <p>
                    {branch && branch}
                    {professional && professional}
                </p>
            )
        }
    },
    {
        accessorKey: "comment",
        header: "Comment",
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => {

            const rating = row?.original?.rating;
            

            return (
                <div className="flex space-x-0.5">
                    {[1,2,3,4,5].map((star) => (
                        <Star 
                            key={star}
                            size={14}
                            className={
                                star <= rating ? "text-yellow-500 fill-current" : "text-gray-400"
                            }
                        />
                    ))}
                </div>
            )
        }
    },
    {
        accessorKey: "",
        header: "Action",
        cell: ({row}) => {

            const status = row?.original.id;

            return(
                <div>
                    <CustomButton 
                        btnType="button"
                        label="Delete"
                        prefixIcon={{ type: "lucide", icon: Trash2Icon }}
                        size="sm"
                        variant="outline"
                        className="text-xs px-2 py-1"
                    />
                </div>
            );
        }
    },
]