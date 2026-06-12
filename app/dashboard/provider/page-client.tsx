"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BriefcaseBusinessIcon, Building2Icon, CalendarCheck2Icon, Settings2Icon, Stars, UserPlus2Icon } from 'lucide-react';
import Image from 'next/image';
import CustomButton from '@/components/ui/custom-button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import DashboardEmptyStats from '../_components/dashboard-empty-stats';


interface ProviderDashboardPageProps {
  data?: any;
}

const ProviderDashboardPage = ({ data }: ProviderDashboardPageProps) => {

  const {data:session} = useSession();

  return (
    <div className="flex flex-col space-y-6 pb-20">

      <div className="pb-1 pt-4">
        <h1 className="font-semibold">Welcome back {session?.user?.name},</h1>
        <p className="text-muted-foreground text-sm">Manage all your healthcare operations from here.</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div>
          <Card className="py-8">
            <CardContent >
              <div className="flex space-x-3.5 items-center">
                <div className="bg-secondary/80 p-2 rounded-full">
                  <Building2Icon size={15} className="text-white" />
                </div>
                <div>
                  <h1 className="font-semibold">Total Companies</h1>
                  <h4 className="font-semibold">{data?.stats?.total_companies || 0}</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="py-8">
            <CardContent >
              <div className="flex space-x-3.5 items-center">
                <div className="bg-primary/80 p-2 rounded-full">
                  <BriefcaseBusinessIcon size={15} className="text-white" />
                </div>
                <div>
                  <h1 className="font-semibold">Total Listings</h1>
                  <h4 className="font-semibold">{data?.stats?.total_branches || 0}</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        

        <div>
          <Card className="py-8">
            <CardContent >
              <div className="flex space-x-3.5 items-center">
                <div className="bg-sky-500 p-2 rounded-full">
                  <BriefcaseBusinessIcon size={15} className="text-white" />
                </div>
                <div>
                  <h1 className="font-semibold">Total Bookings</h1>
                  <h4 className="font-semibold">{data?.stats?.total_bookings || 0}</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        <div>
          <Card className="py-8">
            <CardContent >
              <div className="flex space-x-3.5 items-center">
                <div className="bg-orange-500/50 p-2 rounded-full">
                  <Stars size={15} className="text-white" />
                </div>
                <div>
                  <h1 className="font-semibold">Active Plans</h1>
                  <h4 className="font-semibold">1</h4>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-4 rounded-lg shadow py-5">
          <div className="flex justify-between gap-3">
            <h1 className="font-bold text-sm">Organizations</h1>
            <Link href="/dashboard/provider/organizations" className="text-xs">
              View all
            </Link>
          </div>

          {data?.companies?.length > 0 ? (
            <div className="space-y-5 mt-4">
              {data?.companies?.map((company: any) => (
                <div className="flex md:flex-row flex-col justify-between bg-slate-50 px-3 py-3 gap-3 items-center hover:shadow cursor-pointer rounded-lg" key={company.id}>
                  <div>
                    <div className="relative w-[50px] h-[50px] rounded-full">

                      <Image
                        src={company.logo}
                        alt={company.name}
                        unoptimized
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h1 className="font-semibold text-sm">{company.name}</h1>
                    <p className="capitalize text-slate-600 text-sm">{company.provider_type}</p>
                  </div>
                  <div>
                    {company.is_active ? (
                      <p className="bg-green-400/20 text-xs px-2 py-1 rounded-full border-2 border-green-600">Active</p>
                    ) : (
                      <p className="bg-red-400/20 text-xs px-2 py-1 rounded-full border-2 border-red-600">Inactive</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
              <DashboardEmptyStats
                  icon = { BriefcaseBusinessIcon }
                  title = "No companies listed yet."
                  subtitle = "Register you businesses to be able to reach more patients easily"
              />
          )}
          
        </div>
        <div className="bg-white p-4 rounded-lg shadow py-5">
          <div className="flex justify-between gap-3">
            <h1 className="font-bold text-sm">Branches</h1>
            <Link href="/dashboard/provider/branches" className="text-xs">
              View all
            </Link>
          </div>

          {data?.branches?.length > 0 ? (
            <div className="space-y-5 mt-4">
              {data?.branches?.map((branch: any) => (
                <div className="flex justify-between bg-slate-50 px-3 py-3 hover:shadow cursor-pointer rounded-lg" key={branch.id}>
                  <div className="flex-1">
                    <h1 className="font-semibold text-sm">{branch.name}</h1>
                    <p className="text-xs text-slate-600">{branch.provider}</p>
                  </div>
                  <div className="flex gap-8 items-center">
                    <div>
                      {branch.is_verified ? (
                        <>
                          <p className="text-xs text-green-600">Verified</p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs text-red-600">Not Verified</p>
                        </>
                      )}
                    </div>
                    <div>
                      {branch.is_active ? (
                        <p className="bg-green-400/20 text-xs px-2 py-1 rounded-full border-2 border-green-600">Active</p>
                      ) : (
                        <p className="bg-red-400/20 text-xs px-2 py-1 rounded-full border-2 border-red-600">Inactive</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
              <DashboardEmptyStats
                  icon = { BriefcaseBusinessIcon }
                  title = "No branches listed yet."
                  subtitle = "Make your branches available so patients can start booking you."
              />
          )}
          
        </div>
      </div>

      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-4 rounded-lg shadow py-6">
          <h1 className="font-bold text-sm">Professional Account</h1>
          
          <div className="mt-5">
            {data?.professional ? (
              <div className="flex space-x-3 items-center">
                <div>
                  <div className="relative h-[80px] w-[80px]">
                    {data?.professional?.profile_photo && (
                      <Image
                        src={data?.professional?.profile_photo}
                        alt={data?.professional?.name}
                        unoptimized
                        fill
                        className="object-contain"
                      />
                    )}

                  </div>
                </div>
                <div className="flex-1 space-y-1.5">
                  <h1 className="font-semibold capitalize text-sm">{data?.professional?.title} {data?.professional?.name}</h1>
                  <div className="flex space-x-8 flex-wrap">
                    {data?.professional?.is_active ? (
                      <p className="text-xs text-green-600">Active</p>
                    ) : (
                      <p className=" text-xs text-red-600">Please activate</p>
                    )}
                  </div>
                  <div>
                    {data?.professional?.is_verified ? (
                      <p className="text-xs text-green-600">Verified</p>
                    ) : (
                      <p className=" text-xs text-red-600">Request verification</p>
                    )}
                  </div>
                </div>
                <div>
                  <Link href="/dashboard/provider/me">
                    <CustomButton
                      label="Manage"
                      size="xs"
                      btnType="button"
                      variant="outline"
                      prefixIcon={{ type: "lucide", icon: Settings2Icon }}
                      className="px-3 text-xs"

                    />
                  </Link>
                </div>
              </div>
            ) : (
              <DashboardEmptyStats
                icon={UserPlus2Icon}
                title="Professional Account"
                subtitle="Connect with patients, manage your services, and grow your healthcare presence."
              />
            )}
            
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between gap-3">
            <h1 className="font-bold text-sm">Subscriptions</h1>
            <Link href="/dashboard/provider/subscriptions" className="text-xs">
              View all
            </Link>
          </div>

          <div className="pt-4 space-y-3">
            {data?.subscriptions?.map((sub: any) => (
              <div key={sub.id} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div>
                  <p className="text-xs text-slate-700 capitalize">{sub.source}</p>
                  <h1 className="text-xs text-slate-700 font-semibold">{sub.source_name}</h1>
                </div>
                <div>
                  <p className={cn("text-xs text-slate-700 capitalize", sub.status === "active" ? "text-green-600" : "text-red-600")}>
                    {sub.status}
                  </p>
                  <h1 className="text-xs text-slate-700 font-semibold">{sub.plan}</h1>
                </div>
                <div>
                  { sub.status === "active" ? (
                    <div>
                      <p className="text-xs">Expires</p>
                      <h1 className="text-xs text-slate-700 font-semibold">
                        {new Date(sub.end_date).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric" })}
                      </h1>
                    </div>
                  ) : (
                    <div>
                      <CustomButton 
                        label="Renew"
                        btnType="button"
                      />
                    </div>
                  )}
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ProviderDashboardPage