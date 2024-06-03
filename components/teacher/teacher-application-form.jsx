"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useSession } from "next-auth/react"
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Uame must be at least 2 characters.",
    }),
    email: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    resume: z.any().refine((file) => {
        if (file.size > 5 * 1024 * 1024) {
            throw new Error("File size must be less than 5mb.")
        }
        return true
    }),
    subjects: z.array(z.string()).min(1, {
        message: "Please select at least one subject.",
    }),
    // experience to select from dropdown
    experience: z.string().min(1, {
        message: "Please select your experience.",
    }),

    contact: z.string().refine((value) => {
        if (!/^\+?([0-9]{2})\)?[-. ]?([0-9]{10})$/.test(value)) {
            throw new Error("Please enter a valid phone number.")
        }
        return true
    })
})


function TeacherForm({ onSubmit }) {
    const { data: session, status } = useSession()


    const form = useForm({
        resolver: zodResolver(formSchema),

        defaultValues: {
            name: session.user.name || "",
            email: session.user.email || "",
            resume: null,
            subjects: [],
            experience: "",
            contact: "",


        },
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="{email}" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your email address.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resume</FormLabel>
                            <FormControl>
                                <Input type="file" {...field} />
                            </FormControl>
                            <FormDescription>
                                Please upload your resume.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}

                />
                <FormField
                    control={form.control}
                    name="subjects"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subjects</FormLabel>
                            <FormControl>
                                <Input type="checkbox" {...field} />
                            </FormControl>
                            <FormDescription>
                                Please select the subjects you can teach.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormDescription>
                                Please enter your contact number.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}

                />
                <FormField
                    control={form.control}
                    name="experience"

                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Experience</FormLabel>
                            <FormControl>
                                <Input type="dropdown" {...field} />
                            </FormControl>
                            <FormDescription>
                                Please select your experience.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}

                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
export default TeacherForm
