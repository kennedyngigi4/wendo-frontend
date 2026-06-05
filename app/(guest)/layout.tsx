import React from 'react'
import MainHeader from '../_components/header'
import MainFooter from '../_components/footer'

const GuestLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div>
        <MainHeader />
        <div className="min-h-screen">
            {children}
        </div>
        <MainFooter />
    </div>
  )
}

export default GuestLayout