"use client";

import React from 'react';
import MainHeader from '../_components/header';
import MainFooter from '../_components/footer';

const AuthLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div>
      <MainHeader />
      <div>
        {children}
      </div>
      <MainFooter />
    </div>
  )
}

export default AuthLayout