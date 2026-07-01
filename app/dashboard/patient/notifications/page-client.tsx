"use client";

import { BellIcon } from 'lucide-react';
import React from 'react'

const NotificationsClientPage = () => {
  return (
    <div className="bg-white shadow rounded-lg p-5 my-5">
      <div className="p-6 flex flex-col items-center justify-center text-center my-9 border-2 rounded-2xl border-dotted border-slate-200">
        <BellIcon />
        <h1 className="text-xl font-semibold text-slate-900 pt-5">No notifications yet</h1>
        <p className="text-sm text-slate-500">You will get your notifications here.</p>
      </div>
    </div>
  )
}

export default NotificationsClientPage