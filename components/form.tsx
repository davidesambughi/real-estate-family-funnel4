"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form as ShadcnForm, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { leadSchema, LeadFormValues } from "@/lib/schemas/lead-form";
import { schoolsData } from "@/lib/schools-data";
import { neighborhoodsData } from "@/lib/neighborhoods-data";
import { useState } from "react";

export default function Form() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<LeadFormValues>({
        resolver: zodResolver(leadSchema),
        defaultValues: {
            fullName: "",
            email: "",
            nationality: "",
            phone: "",
            interestedSchool: "",
            interestedNeighborhood: "",
            message: "",
        },
    });

    async function onSubmit(data: LeadFormValues) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Form submitted:", data);
        setIsSubmitting(false);
        setIsSuccess(true);
        form.reset();
    }

    if (isSuccess) {
        return (
            <div className="bg-green-50 p-6 rounded-lg text-center border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
                <p className="text-green-700">Your request has been received. We will be in touch shortly with your personalized guide.</p>
                <Button variant="outline" onClick={() => setIsSuccess(false)} className="mt-4">Send another request</Button>
            </div>
        );
    }

    return (
        <ShadcnForm {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white/80 p-6 rounded-lg shadow-sm backdrop-blur-sm border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nationality"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Nationality *</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. American" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="john@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Phone (Optional)</FormLabel>
                                <FormControl>
                                    <Input type="tel" placeholder="+1 234 567 890" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="interestedSchool"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Interested School (Optional)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a school" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {schoolsData.map((school) => (
                                            <SelectItem key={school.id} value={school.name}>
                                                {school.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="interestedNeighborhood"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormLabel>Interested Area (Optional)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an area" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {neighborhoodsData.map((neighborhood) => (
                                            <SelectItem key={neighborhood.id} value={neighborhood.name}>
                                                {neighborhood.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>Questions or Comments</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us what you are looking for..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full text-lg py-6" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Get Your Personalized Guide"}
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-2">
                    We respect your privacy. No spam, ever.
                </p>
            </form>
        </ShadcnForm>
    );
}