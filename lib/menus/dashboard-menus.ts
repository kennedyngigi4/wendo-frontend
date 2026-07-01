import { Ambulance, BellIcon, BriefcaseBusinessIcon, BriefcaseMedicalIcon, Calendar1Icon, CalendarCheck, ClipboardList, Clock3Icon, Clock4Icon, CreditCardIcon, GraduationCapIcon, Layers, LayoutDashboard, MessageCircle, Network, Settings2Icon, StarsIcon, Stethoscope, UserPenIcon } from "lucide-react"

export const PatientMenus = [
    {
        label: "Dashboard",
        url: "/dashboard/patient",
        icon: LayoutDashboard
    },
    {
        label: "Appointments",
        url: "/dashboard/patient/appointments",
        icon: Calendar1Icon
    },
    {
        label: "Reviews",
        url: "/dashboard/patient/reviews",
        icon: StarsIcon
    },
    {
        label: "Notifications",
        url: "/dashboard/patient/notifications",
        icon: BellIcon
    }
]


export const DefaultProviderMainMenus = [
    {
        label: "Dashboard",
        url: "/dashboard/provider",
        icon: LayoutDashboard
    },
    {
        label: "Listings",
        url: "/dashboard/provider/organizations",
        icon: BriefcaseBusinessIcon
    },
    {
        label: "Branches",
        url: "/dashboard/provider/branches",
        icon: Network
    },
    {
        label: "Subscriptions",
        url: "/dashboard/provider/subscriptions",
        icon: CreditCardIcon
    },
    {
        label: "Settings",
        url: "/dashboard/provider/settings",
        icon: BriefcaseBusinessIcon
    }
]



export const ProviderHospitalMenus = [
    { label: "Hospital Dashboard", url: "/dashboard/provider/hospital", icon: LayoutDashboard },
    { label: "Bookings", url: "/dashboard/provider/hospital/bookings", icon: CalendarCheck },
    { label: "Services", url: "/dashboard/provider/hospital/services", icon: Layers },
    { label: "Specialists", url: "/dashboard/provider/hospital/specialists", icon: Stethoscope },
    { label: "Clinics", url: "/dashboard/provider/hospital/clinics", icon: ClipboardList },
    { label: "Working Hours", url: "/dashboard/provider/hospital/working-hours", icon: Clock3Icon },
    { label: "Reviews", url: "/dashboard/provider/hospital/reviews", icon: MessageCircle },
    { label: "Settings", url: "/dashboard/provider/hospital/settings", icon: Settings2Icon },
];

export const ProviderAmbulanceMenus = [
    { label: "Ambulance Dashboard", url: "/dashboard/ambulance", icon: Ambulance },
    { label: "Requests", url: "/dashboard/requests", icon: LayoutDashboard },
];

export const ProviderProfessionalMenus = [
    { label: "My Dashboard", url: "/dashboard/provider/professional", icon: Stethoscope },
    { label: "Bookings", url: "/dashboard/provider/professional/bookings", icon: CalendarCheck },
    { label: "Services", url: "/dashboard/provider/professional/services", icon: Layers },
    { label: "Education", url: "/dashboard/provider/professional/education", icon: GraduationCapIcon },
    { label: "Operating Hours", url: "/dashboard/provider/professional/operating-hours", icon: Clock4Icon },
    { label: "Reviews", url: "/dashboard/provider/professional/reviews", icon: MessageCircle },
    { label: "Profile", url: "/dashboard/provider/professional/profile", icon: UserPenIcon },
];

