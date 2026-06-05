"use client"

import { Button } from "@/components/ui/button"
import CustomButton from "@/components/ui/custom-button"
import { SubscriptionModel } from "@/lib/models/subscription-models"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, PlusIcon, RecycleIcon, Settings2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export const SubscriptionsColumns: ColumnDef<SubscriptionModel>[] = [
    {
        accessorKey: "plan",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Plan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "source_name",
        header: "Source",
        cell: ({row}) => {
            const sourceName = row?.original?.source_name;
            const source = row?.original?.source;

            return(
                <div>
                    <p className="capitalize font-semibold">{sourceName}</p>
                    {/* <p className="capitalize text-sm">{source}</p> */}
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const status = row?.original.status;

            return (
                <div className={cn("text-xs capitalize", status === "active" ? "text-green-600" : "text-red-600")}>
                    <p>{status}</p>
                </div>
            )
        }
    },
    {
        accessorKey: "end_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Expiry
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const startDate = new Date(row?.original.start_date).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" });
            const endDate = new Date(row?.original.end_date).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric"});

            return (
                <div className="flex gap-5">
                    <p>{endDate}</p>
                </div>
            )
        }
    },
    {
        accessorKey: "",
        header: "Action",
        cell: ({row}) => {
            const id = row?.original.id;
            const status = row?.original.status;

            return(
                <div className="flex items-center space-x-4">
                    {status !== "active" && (
                        <div>
                            <CustomButton
                                size="xs"
                                prefixIcon={{ type: "lucide", icon: RecycleIcon }}
                                className="px-2.5 text-xs py-4"
                                label="Renew"
                                btnType="button"
                                variant="secondary"
                            />
                        </div>
                    )}
                    <div>
                        <CustomButton 
                            size="xs" 
                            prefixIcon={{ type: "lucide", icon: Settings2Icon }} 
                            className="px-2.5 text-xs py-4" 
                            label="Manage" 
                            btnType="button" 
                            variant="outline"
                        />
                    </div>
                </div>
            )
        }
    },
]