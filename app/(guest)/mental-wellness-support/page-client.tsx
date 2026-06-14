"use client";

import { HeartHandshake } from "lucide-react";

const MentalSupportClientPage = () => {
    return (
        <div className="app-container min-h-[70vh] flex items-center justify-center">
            <div className="max-w-2xl text-center">
                <div className="flex justify-center my-6">
                    <div className="p-4 rounded-full bg-teal-100">
                        <HeartHandshake
                            size={48}
                            className="text-teal-600"
                        />
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-primary mb-4">
                    Mental Wellness Support
                </h1>

                <p className="text-lg text-gray-600 mb-6">
                    We're building a safe and supportive space where you can access
                    wellness resources, emotional support tools, and AI-powered guidance
                    whenever you need it.
                </p>

                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
                    <h2 className="font-semibold text-blue-900 mb-2">
                        Coming Soon 🚀
                    </h2>

                    <p className="text-blue-700">
                        Wendo Care will provide confidential wellness support, guided
                        self-care resources, mood check-ins, and connections to qualified
                        mental health professionals.
                    </p>
                </div>

                <div className="text-sm text-gray-500">
                    Stay tuned as we continue expanding access to holistic healthcare
                    across Africa.
                </div>
            </div>
        </div>
    );
};

export default MentalSupportClientPage;