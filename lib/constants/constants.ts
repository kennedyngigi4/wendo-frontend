export const CONSTANTS = {

    appName: "Afyhub",
    tagline1: "Connecting Patients to Trusted Healthcare.",
    tagline2: "Connect . Trust . Care",

    keywords: "afyhub Kenya, afyhub Africa, healthcare directory Kenya, medical directory Africa, find doctors Kenya, hospitals in Kenya, clinics near me Kenya, healthcare providers Kenya, online doctor booking Kenya, telemedicine Kenya, digital health platform Africa, health services Nairobi, private hospitals Nairobi, best clinics Kenya, medical specialists Kenya, affordable healthcare Kenya, health facilities Africa, patient booking system Kenya, doctor appointment Kenya, healthcare marketplace Africa, verified doctors Kenya, pharmacy near me Kenya, diagnostic centers Kenya, lab services Kenya, health tech Kenya, e-health Africa, mHealth Africa, healthcare solutions Africa, medical tourism Kenya, Nairobi healthcare services, rural healthcare access Kenya, primary care Kenya, specialist doctors Nairobi, dentist Kenya, pediatrician Kenya, gynecologist Kenya, mental health services Kenya, wellness clinics Kenya, urgent care Kenya, outpatient services Kenya, inpatient hospitals Kenya, healthcare platform Nairobi, health directory Nairobi, book a doctor online Africa, healthcare network Africa",

    providerTypes: [
        { value: "ambulance", label: "Ambulance"}, 
        { value: "clinic", label: "Clinic"}, 
        { value: "hospital", label: "Hospital" }, 
        { value: "lab", label: "Laboratory" }, 
        { value: "pharmacy", label: "Pharmacy"},
    ],

    countries: [
        { value: "ke", label: "Kenya" }
    ],

    titles: [
        { value: "dr", label: "Doctor"},
        { value: "prof", label: "Professor"},
        { value: "mr", label: "Mr"},
        { value: "mrs", label: "Mrs"},
        { value: "miss", label: "Miss" },
    ],


    weekDays: [
        { id: "1", name: "Monday" },
        { id: "2", name: "Tuesday" },
        { id: "3", name: "Wednesday" },
        { id: "4", name: "Thursday" },
        { id: "5", name: "Friday" },
        { id: "6", name: "Saturday" },
        { id: "7", name: "Sunday" },
    ],

    


    providerHubs: [
        {
            id: 1,
            title: "Doctor Consultation",
            subtitle: "Find trusted doctors and book appointments.",
            icon: "/assets/icons/healthhub/doctors.png",
        },
        {
            id: 2,
            title: "Hospitals & Clinics",
            subtitle: "Find trusted hospitals and clinics near you",
            icon: "/assets/icons/healthhub/hospital.png",
        },
        {
            id: 3,
            title: "Emergency & Urgent Care",
            subtitle: "Quick access to emergency transport when you need it most.",
            icon: "/assets/icons/healthhub/ambulance.png",
        },
        {
            id: 4,
            title: "Diagnostics",
            subtitle: "Locate nearby labs for tests and diagnostics.",
            icon: "/assets/icons/healthhub/laboratory.png",
        },
        {
            id: 5,
            title: "Medication & Pharmacies",
            subtitle: "Discover pharmacies for prescriptions and health products.",
            icon: "/assets/icons/healthhub/pharmacy.png",
        },
        {
            id: 6,
            title: "Professionals",
            subtitle: "Connect with qualified healthcare professionals",
            icon: "/assets/icons/healthhub/nurse.png",
        },
        
    ],


    services: [
        {
            id: 1,
            title: "Healthcare Online Listing",
            subtitle: "Connect with trusted doctors, hospitals, and healthcare providers near you",
            icon: "",
        },
        {
            id: 2,
            title: "Website & Software Development",
            subtitle: "Custom digital solutions tailored for healthcare businesses and professionals",
            icon: "",
        },
        {
            id: 3,
            title: "Digital Marketing",
            subtitle: "Grow your healthcare brand and reach more patients online",
            icon: "",
        },
        {
            id: 4,
            title: "Creative Design & Printing",
            subtitle: "Professional branding, design, and print solutions for your business",
            icon: "",
        },
        {
            id: 5,
            title: "Photography & Videography",
            subtitle: "High-quality visuals to showcase your services and build trust",
            icon: "",
        },
        {
            id: 6,
            title: "Afya Talks Podcast & Events",
            subtitle: "Grow your visibility and connect with patients through podcasts and events",
            icon: "",
        }
    ],

    patientServices: [
        {
            id: 1,
            title: "Find Healthcare Providers",
            subtitle: "Discover trusted doctors, clinics, hospitals, and specialists near you.",
            icon: "",
        },
        {
            id: 2,
            title: "Book Appointments",
            subtitle: "Schedule healthcare visits quickly and conveniently online.",
            icon: "",
        },
        {
            id: 3,
            title: "Teleconsultation",
            subtitle: "Connect with healthcare professionals from the comfort of your home.",
            icon: "",
        },
        {
            id: 4,
            title: "Compare Providers",
            subtitle: "View profiles, services, locations, and patient information to make informed choices.",
            icon: "",
        },
        {
            id: 5,
            title: "Health Information & Resources",
            subtitle: "Access reliable health tips, articles, podcasts, and educational content.",
            icon: "",
        },
        {
            id: 6,
            title: "Personalized Care Navigation",
            subtitle: "Get guidance to the right healthcare services and specialists.",
            icon: "",
        }
    ],


    impacts: [
        {
            id: 1,
            sdg: 3,
            title: "Good Health & Well-being",
            subtitle: "Expanding access to quality healthcare services for improved patient outcomes",
            image: "/assets/images/sdgs/3.jpeg",
        },
        {
            id: 2,
            sdg: 9,
            title: "Innovation & Infrastructure",
            subtitle: "Powering healthcare access through scalable digital solutions",
            image: "/assets/images/sdgs/9.jpeg",
        },
        {
            id: 3,
            sdg: 10,
            title: "Reduced Inequalities",
            subtitle: "Bridging healthcare gaps by connecting underserved communities to care",
            image: "/assets/images/sdgs/10.jpeg",
        },
        {
            id: 4,
            sdg: 17,
            title: "Partnerships for the Goals",
            subtitle: "Collaborating with stakeholders to build a stronger healthcare ecosystem",
            image: "/assets/images/sdgs/17.jpeg",
        },
    ],


    CONSULTATION_TYPES: [
        { name: "In-person Consultation", id: "in_person", }, 
        { name: "Virtual Consultation", id: "virtual", }, 
        { name: "Home Visit", id: "home_visit", }, 
        { name: "Emergency Consultation", id: "emergency", }, 
        { name: "Follow-up Consultation", id: "follow_up", },
    ],

    // REASONS WHY PATIENTS SHOULD TRUST A HOSPITAL
    TRUST_OPTIONS: [
        { id: "friendly_staff", name: "Friendly & Caring Staff" },
        { id: "short_waiting_time", name: "Short Waiting Time" },
        { id: "affordable_services", name: "Affordable Healthcare Services" },
        { id: "insurance_accepted", name: "Insurance Accepted" },
        { id: "experienced_doctors", name: "Experienced Doctors" },
        { id: "clean_environment", name: "Clean & Comfortable Environment" },
        { id: "quality_patient_care", name: "Quality Patient Care" },
        { id: "fast_service", name: "Fast & Efficient Service" },
        { id: "modern_equipment", name: "Modern Medical Equipment" },
        { id: "privacy_confidentiality", name: "Patient Privacy & Confidentiality" },
        { id: "open_weekends", name: "Open on Weekends" },
        { id: "24_7_services", name: "24/7 Medical Services" },
        { id: "laboratory_services", name: "Laboratory Services Available" },
        { id: "pharmacy_available", name: "On-Site Pharmacy Available" },
        { id: "specialist_consultations", name: "Specialist Consultations Available" },
    ],

    HOSPITAL_OWNERSHIP: [
        { id: "public", name: "Public / Government-Owned" },
        { id: "private", name: "Private Hospital" },
        { id: "faith_based", name: "Faith-Based Organization" },
        { id: "ngo_charity", name: "NGO / Charity-Owned" },
        { id: "mission_hospital", name: "Mission Hospital" },
        { id: "community", name: "Community-Owned Facility" },
        { id: "university_teaching", name: "University / Teaching Hospital" },
        { id: "parastatal", name: "Parastatal / State Corporation Facility" },
    ],

    HOSPITAL_LEVELS: [
        { id: "level_1", name: "Level 1 - Community Health Services" },
        { id: "level_2", name: "Level 2 - Dispensary" },
        { id: "level_3", name: "Level 3 - Health Centre" },
        { id: "level_4", name: "Level 4 - Primary Hospital" },
        { id: "level_5", name: "Level 5 - County Referral Hospital" },
        { id: "level_6", name: "Level 6 - National Referral Hospital" },
    ]

}