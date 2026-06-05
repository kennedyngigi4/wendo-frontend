"use client";

import React from 'react'
import ProfessionalForm from '../_components/professional-form'

interface ProfessionalClientDetailsPageProps {
    userData?: any;
}

const ProfessionalClientDetailsPage = ({ userData }: ProfessionalClientDetailsPageProps) => {
    return (
        <div className="bg-white shadow rounded-xl my-5 p-5">

            <div className="pb-6">
                <h1 className="text-lg font-bold text-secondary">Manage your profile</h1>
                <p className="text-sm text-muted-foreground">You can now edit your profile.</p>
            </div>

            <div>
                <ProfessionalForm userData={userData} id={userData?.professional?.id} />
            </div>
        </div>
    )
}

export default ProfessionalClientDetailsPage