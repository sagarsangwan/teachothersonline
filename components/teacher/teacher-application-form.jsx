"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import Select from "react-tailwindcss-select";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
    Form,
    FormControl,
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
    subjects: z.array(z.string()).nonempty({
        message: "Please select at least one subject.",
    }),

    experience: z.string().min(1, {
        message: "Please select your experience.",
    }),

    contact_number: z.string().refine((contact) => {
        if (!/^\d{10}$/.test(contact)) {
            throw new Error("Please enter a valid phone number.")
        }
        return true
    })
})


const subjects = [
    { value: "math", label: "math" }
]


function TeacherForm({ }) {
    const { data: session, status } = useSession()
    const onSubmit = async (data) => {
        preventDefault()
        try {
            const response = await fetch("/api/teacher-form-submission", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const json = await response.json()
            console.log(json)
        } catch (error) {
            console.error(error)
        }

    }

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
    const [subject, setSubject] = useState(null);

    const handleChange = value => {
        console.log("value:", value);
        setSubject(value);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>

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

                            <FormMessage />
                        </FormItem>
                    )}

                />
                <FormField
                    control={form.control}
                    name="subjects"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Choose subjects</FormLabel>
                            <FormControl>
                                <Select
                                    value={subject}
                                    onChange={handleChange}
                                    options={subjects}
                                />
                            </FormControl>
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
