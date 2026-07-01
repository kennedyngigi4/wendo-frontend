"use client";

import React from 'react'
import { GlobalDataTable } from '@/components/ui/data-table';
import { reviewColumns } from './_components/review-columns';
import { Input } from '@/components/ui/input';
import { PatientReviewModel } from '@/lib/models/review-models';

interface ReviewsClientPageProps {
  reviews: PatientReviewModel[]
}

const ReviewsClientPage = ({ reviews }: ReviewsClientPageProps) => {
  return (
    <div className="bg-white shadow rounded-lg p-5 my-5">

      <div className="pb-5">
        <h1 className="font-semibold text-xl">Reviews </h1>
      </div>

      <div>
        <GlobalDataTable 
          data={reviews} 
          columns={reviewColumns} 
          searchSection={(table) => (
            <Input
              placeholder="Search by provider..."
              value={(table.getColumn("provider")?.getFilterValue() as string) ?? ""}
              onChange={(e) =>
                table.getColumn("provider")?.setFilterValue(e.target.value)
              }
            />
          )}
        />
      </div>
    </div>
  )
}

export default ReviewsClientPage