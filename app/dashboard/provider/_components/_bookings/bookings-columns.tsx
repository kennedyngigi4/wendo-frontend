"use client"

import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/custom-button";
import { BookingModel } from "@/lib/models/booking-models"
import { useWorkspaceStore } from "@/stores/workspaceStore";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";


export const Bookingscolumns: ColumnDef<BookingModel>[] = [
    {
        accessorKey: "name",
        header: "Patient Name",
    },
    {
        accessorKey: "service.service_name",
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
        accessorKey: "phone",
        header: "Phone",
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
    },
    {
        accessorKey: "",
        header: "Action",
        cell: ({row}) => {

            const id = row?.original.id;
            const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);

            return(
                <Link href={`/dashboard/provider/${activeWorkspace?.provider_type}/bookings/${id}/`}>
                    <CustomButton 
                        label="Manage"
                        btnType="button"
                        size="xs"
                        variant="outline"
                        className="px-3 py-3"
                    />
                </Link>
            );
        }
    }
]