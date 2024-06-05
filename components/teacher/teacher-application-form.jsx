"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Uame must be at least 2 characters.",
    }),
})


const subjects = [
    { id: "math", label: "Math" },
    { id: "science", label: "Science" },
    { id: "english", label: "English" },
    { id: "history", label: "History" },
    { id: "foreign-language", label: "Foreign Language" },
    { id: "other", label: "Other" },


]


function TeacherForm({ }) {
    const onSubmit = async (data) => {
        // preventDefault()
        try {
            const response = await fetch("/api/teacher-form-submission", {
                method: "POST",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                body: JSON.stringify(data),
            })
            const res = await response.json()
            console.log("res-----------", res)
        } catch (error) {
            console.error(error)
        }

    }

    const form = useForm({
        resolver: zodResolver(formSchema),

        defaultValues: {
            name: "sagar",
        },
    })
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
export default TeacherForm
