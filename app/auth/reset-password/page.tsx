import React, { Suspense } from 'react'
import ResetPasswordClientPage from './page-client'

type ResetPasswordPageProps = {
    searchParams: Promise<{
        uid?: string;
        token?: string;
    }>;
};

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {

    const { uid, token } = await searchParams;

    return (
        <div>
            <Suspense fallback={<div className="flex w-full min-h-screen items-center justify-center">Loading...</div>}>
                <ResetPasswordClientPage uid={uid} token={token} />
            </Suspense>
        </div>
    )
}

export default ResetPasswordPage