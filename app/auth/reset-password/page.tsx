import React, { Suspense } from 'react'
import ResetPasswordClientPage from './page-client'

type ResetPasswordPageProps = {
    params: Promise<{
        uid?: string,
        token?: string
    }>
}

const ResetPasswordPage = async ({ params }: ResetPasswordPageProps) => {

    const { uid, token } = await params;

    return (
        <div>
            <Suspense fallback={<div className="flex w-full min-h-screen items-center justify-center">Loading...</div>}>
                <ResetPasswordClientPage uid={uid} token={token} />
            </Suspense>
        </div>
    )
}

export default ResetPasswordPage