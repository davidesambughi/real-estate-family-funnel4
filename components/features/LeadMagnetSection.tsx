import Form from "@/components/form";
import { CheckCircle2, MessageSquare, Bell, UserPlus } from "lucide-react";

export function LeadMagnetSection() {
    return (
        <section id="lead-magnet" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-50/50">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start">

                {/* Left Column: Copy & Benefits */}
                <div className="flex-1 space-y-8">
                    <div>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
                            Relocating to Portugal? <br />
                            <span className="text-blue-600">Don't do it alone.</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                            Get free, unbiased advice from locals and expats who have been in your shoes.
                            Skip the confusion and make informed decisions for your family's future.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-2 rounded-full shadow-sm text-blue-600 mt-1">
                                <MessageSquare className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">Ask Any Question</h3>
                                <p className="text-slate-600">
                                    Unsure about schools or neighborhoods? Send us your specific questions and get a personalized answer.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-2 rounded-full shadow-sm text-blue-600 mt-1">
                                <Bell className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">Stay Updated for 2026</h3>
                                <p className="text-slate-600">
                                    School fees and availability change fast. Join our list to get the latest 2026 admission updates.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-2 rounded-full shadow-sm text-blue-600 mt-1">
                                <UserPlus className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">Get Your Free Guide</h3>
                                <p className="text-slate-600">
                                    Receive our comprehensive relocation checklist and school comparison guide instantly.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center gap-2 text-sm text-slate-500">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>100% Free & Unbiased</span>
                        <div className="w-1 h-1 bg-slate-300 rounded-full mx-2" />
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Privacy Protected</span>
                    </div>
                </div>

                {/* Right Column: The Enhanced Form */}
                <div className="flex-1 w-full max-w-md lg:max-w-xl">
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                        <div className="bg-blue-600 p-6 text-white text-center">
                            <h3 className="text-2xl font-bold">Get Personalized Help</h3>
                            <p className="text-blue-100 text-sm mt-1">Fill out the form below to start your journey</p>
                        </div>
                        <div className="p-6">
                            <Form />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
