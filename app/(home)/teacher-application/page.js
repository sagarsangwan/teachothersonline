"use client"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import isAuth from "@/lib/isAuth";
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
import { useSession } from "next-auth/react";

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
    resume: z.any(),
    subjects: z.array(z.string()).nonempty({
        required_error: "Please select at least one subject",
    }),
})

const currentFullUrl = process.env.NEXT_PUBLIC_BASE_URL + "/teacher-application"

const subjects = [
    { id: "math", label: "Math" },
    { id: "science", label: "Science" },
    { id: "english", label: "English" },
    { id: "history", label: "History" },
    { id: "foreign-language", label: "Foreign Language" },
    { id: "other", label: "Other" },


]

function Teacherapplication() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const OnSubmit = async (data) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("education", data.education);
        formData.append("experience", data.experience);
        formData.append("contact", data.contact);
        if (data.resume) {
            formData.append("resume", data.resume[0]);
        }
        formData.append("subjects", data.subjects);
        console.log(formData)
        try {
            const response = await fetch("/api/teacher/teacher-form-submission", {
                method: "POST",
                body: formData,

            })
            const res = await response.json()
            if (res.status === 201) {
                toast.success(res.message || "Application submitted successfully");
                form.reset();
                router.push("/");
            }
            if (res.status === 400) {
                toast.error(res.message || "You have already submitted a teacher application go back to home page");
                form.reset();
                router.push("/");
            }
        } catch (error) {

            toast.error("something went wrong try after some time ")
        } finally {

            setLoading(false)
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
    const fileRef = form.register("resume");

    return (

        <div className=''>

            <div>
                <div className='justify-center items-center flex flex-col py-7'>
                    <p>
                        Hii ! We are excited to have you on board. Please fill the form below to apply as a teacher. We will get back to you soon.
                    </p>

                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(OnSubmit)} className="space-y-8">
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
                                        <Input id="resume" type="file" {...fileRef} />
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
                        <Button disabled={loading} type="submit">
                            {loading ?
                                <div role="status">
                                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                : 'Submit'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}


export default isAuth(Teacherapplication,)
// export default Teacherapplication
