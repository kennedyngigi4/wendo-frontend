"use client";

import React from 'react';
import { SubscriptionsDataTable } from './_components/subscriptions-datatable';
import { SubscriptionsColumns } from './_components/subscriptions-columns';


interface SubscriptionsClientPageProps {
    data: any[];
}

const SubscriptionsClientPage = ({ data }: SubscriptionsClientPageProps) => {
  return (
    <div className="bg-white p-8 my-5 rounded-lg shadow">

        <div className="pb-5">
            <h1 className="text-secondary font-semibold text-xl">All Subscriptions</h1>
            <p className="text-sm text-slate-500">Manage plans, billing status, renewals, and active subscriptions.</p>
        </div>

        <SubscriptionsDataTable columns={SubscriptionsColumns} data={data} />
    </div>
  )
}

export default SubscriptionsClientPage