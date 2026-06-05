"use client";

import React from 'react'
import { BookingModel } from '@/lib/models/booking-models';
import { BookingsDataTable } from '../../../_components/_bookings/bookings-datatable';
import { Bookingscolumns } from '../../../_components/_bookings/bookings-columns';


interface BookingsClientPageProps{
    data: BookingModel[];
    name: string;
}

const BookingsClientPage = ({ data, name }: BookingsClientPageProps) => {
  return (
    <div className="bg-white my-5 p-5 shadow rounded-lg">
        <div className="pb-5">
            <h1 className="capitalize text-lg text-secondary font-semibold">{name} bookings</h1>
              <p className="text-sm text-slate-600">Manage, track, and optimize all your <strong>{name}</strong> bookings in one place</p>
        </div>

        <BookingsDataTable data={data} columns={Bookingscolumns} />
    </div>
  )
}

export default BookingsClientPage