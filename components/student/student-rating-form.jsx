"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    classReview: z.string(),
    classRating: z
        .string().min(1, {
            message: "Please choose a rating for class",
        }),
    teacherRating: z
        .string().min(1, {
            message: "Please choose a rating for teacher",
        }),
    teacherReview: z.string()

})

function StudentRatingForm({ demoClass }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            classRating: "1",
            classReview: "",
            teacherRating: "1",
            teacherReview: "",

        },
    })

    async function onSubmit(values) {
        values.studentId = demoClass.studentId;
        values.teacherId = demoClass.teacherId;
        values.classId = demoClass.id;
        values.classType = demoClass.type
        try {
            setLoading(true)
            const response = await fetch("/api/student/class-review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            const res = await response.json()

            if (res.status === 200) {
                setLoading(false)
                toast.success(res.message || "submitted successfully")
                router.refresh();
            } else {
                toast.error(res.message || "Error submitting form. Try again later.");
            }
        } catch (error) {
            toast.error(error || "something went wrong try after somee time")
        } finally {
            setLoading(false)
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button >
                    Rate your class
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> {demoClass.type.toUpperCase()} Class Feedback  </DialogTitle>
                    <DialogDescription>
                        We value your feedback! Please take a moment to rate your demo class and share your thoughts with us. Your feedback helps us improve our services.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="classRating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Class Rating</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a class Rating" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">1 star</SelectItem>
                                                <SelectItem value="2">2 star</SelectItem>
                                                <SelectItem value="3">3 star</SelectItem>
                                                <SelectItem value="4">4 star</SelectItem>
                                                <SelectItem value="5">5 star</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="classReview"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Class Review</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="teacherRating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teacher Rating</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Teacher Rating" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="1">1 star</SelectItem>
                                                <SelectItem value="2">2 star</SelectItem>
                                                <SelectItem value="3">3 star</SelectItem>
                                                <SelectItem value="4">4 star</SelectItem>
                                                <SelectItem value="5">5 star</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="teacherReview"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teacher Review</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {loading ? <Button disabled>loading</Button> : <Button type="submit">Submit</Button>}

                        </form>
                    </Form>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default StudentRatingForm
