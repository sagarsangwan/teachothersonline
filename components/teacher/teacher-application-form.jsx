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
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import validator from "validator";

const ACCEPTED_FILE_TYPES = ["application/pdf"]
const MAX_FILE_SIZE = 5000000
const formSchema = z.object({
    education: z.string().min(1, {
        message: "Education is required",
    }),
    experience: z.string().min(1, {
        message: "Experience is required",
    }),
    contact: z.string().refine(validator.isMobilePhone, {
        message: "Invalid phone number",
    }),
    resume: z.any().refine((file) => {
        if (!file) {
            return false
        }
        return true
    }, {
        message: "Invalid file type or size",
    }),
    subjects: z.array(z.string()).nonempty({
        required_error: "Please select at least one subject",
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


function TeacherForm() {
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
            form.reset(
                {
                    education: "",
                    experience: "",
                    contact: "",
                    resume: undefined,
                    subjects: [],
                },
                {
                    keepValues: false,
                    keepErrors: false,
                    keepDirty: false,
                    keepIsSubmitted: false,
                }
            )
            // clear the form 



        } catch (error) {
            console.error(error)
            // clear the form and show an toast message

        }

    }

    const form = useForm({
        resolver: zodResolver(formSchema),

        defaultValues: {
            education: "",
            experience: "",
            contact: "",
            resume: undefined,
            subjects: [],

        },
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Education</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your education level" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="high-school">High School</SelectItem>
                                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                                    <SelectItem value="graduate">Graduate</SelectItem>
                                    <SelectItem value="doctorate">Doctorate</SelectItem>

                                </SelectContent>
                            </Select>

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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your experience level" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="0-1">0-1 years</SelectItem>
                                    <SelectItem value="1-3">1-3 years</SelectItem>
                                    <SelectItem value="3-5">3-5 years</SelectItem>
                                    <SelectItem value="5+">5+ years</SelectItem>

                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input  {...field} />
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
                                <Input id="resume" type="file" {...field} />
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
                            <div className="flex flex-wrap gap-4">
                                {subjects.map((subject) => (
                                    <label key={subject.id} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            value={subject.label}
                                            checked={field.value.includes(subject.label)}
                                            onChange={(e) => {
                                                const newValue = [...field.value];
                                                if (e.target.checked) {
                                                    newValue.push(subject.label);
                                                } else {
                                                    newValue.splice(newValue.indexOf(subject.label), 1);
                                                }
                                                field.onChange(newValue);
                                            }}
                                        />
                                        <span>{subject.label}</span>
                                    </label>
                                ))}
                            </div>
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
