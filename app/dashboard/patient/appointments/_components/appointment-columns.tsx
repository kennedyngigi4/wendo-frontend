"use client"

import { PatientBookingModel } from "@/lib/models/booking-models"
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"


export const appointmentColumns: ColumnDef<PatientBookingModel>[] = [
    
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
        accessorKey: "service",
        header: "Service",
        cell: ({row}) => {

            const service = row?.original?.service.service_name;

            return (
                <p>{service}</p>
            )
        }
    },
    {
        accessorKey: "appointment_date",
        header: "Appointment Date",
        cell: ({ row }) => {

            const appoinmentDate = row?.original?.appointment_date;
            const appoinmentTime = row?.original?.appointment_time;

            return (
                <p>{appoinmentDate} - {appoinmentTime}</p>
            )
        }
    },
    {
        accessorKey: "",
        header: "Provider/ Specialist",
        cell: ({ row }) => {

            const branch = row?.original?.branch_name;
            const professional = row?.original?.professional_name;
            const provider = row?.original?.provider_name;

            return (
                <div>
                    {branch && (
                        <p>{branch}</p>
                    )}

                    {professional && (
                        <p>{professional}</p>
                    )}

                    {provider && (
                        <p>{provider}</p>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => {

            const status = row?.original.status;

            return(
                <p className={cn(
                    "text-xs capitalize rounded-full px-3 py-0.5 inline-flex", 
                    status === "cancelled" && "text-red-600 border-1 border-red-400 bg-red-50",
                    status === "pending" && "text-amber-600 border-1 border-amber-400 bg-amber-50",
                    status === "confirmed" && "text-purple-600 border-1 border-purple-400 bg-purple-50",
                    status === "completed" && "text-green-600 border-1 border-green-400 bg-green-50",
                    
                )}>{status}</p>
            );
        }
    },
]