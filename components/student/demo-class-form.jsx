"use client"
import { useState } from "react";
import { CiCalendar } from "react-icons/ci";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
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
import Link from "next/link";

const formSchema = z.object({
    date_of_class: z.date({
        required_error: "A date of birth is required.",
    }),
    time_of_class: z.string().nonempty({
        message: "Time of class is required"
    }),
    contact: z.string().refine(validator.isMobilePhone, {
        message: "Invalid phone number",
    }),
    subjects: z.string().min(1, {
        message: "Please select a subject"

    })
})


const subjects = [
    { id: "math", label: "Math" },
    { id: "science", label: "Science" },
    { id: "english", label: "English" },
    { id: "history", label: "History" },
    { id: "foreign-language", label: "Foreign Language" },
    { id: "other", label: "Other" },


]

export default function DemoClassStudent() {
    const router = useRouter();
    const { data: session, status } = useSession();


    const [loading, setLoading] = useState(false);
    const OnSubmit = async (data) => {
        setLoading(true)
        try {
            const response = await fetch("/api/student-class-create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const res = await response.json()

            if (res.status === 200) {
                setLoading(false)
                toast.success(res.message || "submitted successfully")
                form.reset({
                    time_of_class: "",
                    date_of_class: "",
                    contact: "",
                    subjects: [],
                });
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

    const form = useForm({
        resolver: zodResolver(formSchema),

        defaultValues: {
            time_of_class: "",
            contact: "",
            date_of_class: "",
            subjects: ""

        },
    })

    return (
        <Form {...form}>

            <form onSubmit={form.handleSubmit(OnSubmit)} className=" space-y-4">
                <div className="flex space-x-1">
                    <FormField
                        control={form.control}
                        name="date_of_class"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>choose a date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    " min-w-[200px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CiCalendar className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            // fromDate={new Date("2024-6-14")}
                                            // toDate={new Date("2024-6-24")}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date("2024-6-24") || date < new Date()
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="time_of_class"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Choose time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                </div>
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
                    name="subjects"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>subject</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a subject" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {subjects.map((subject) => (
                                        <SelectItem key={subject.id} value={subject.id}>{subject.label}</SelectItem>
                                    ))}

                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />{status === "authenticated" ?
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
                    : <Link href="/api/auth/signin"><Button className="mt-3">Sign in to submit</Button></Link>}
            </form>
        </Form>
    )
}


