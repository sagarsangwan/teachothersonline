"use client";
import { use, useEffect, useState } from "react";
import { CiCalendar } from "react-icons/ci";

import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateTimePicker } from "../ui/datetime-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import validator from "validator";
import { useSession } from "next-auth/react";
import Link from "next/link";

const formSchema = z.object({
  datetime: z.date().refine((date) => date > new Date(), {
    message: "Date must be in the future",
  }),

  contact: z.string().refine(validator.isMobilePhone, {
    message: "Invalid phone number",
  }),
  subjects: z.string().min(1, {
    message: "Please select a subject",
  }),
});

const subjects = [
  { id: "math", label: "Mathematics" },
  { id: "physics", label: "Physics" },
  { id: "chemistry", label: "Chemistry" },
  { id: "biology", label: "Biology" },
  { id: "computer-science", label: "Computer Science" },
  { id: "english", label: "English" },
  { id: "literature", label: "Literature" },
  { id: "history", label: "History" },
  { id: "geography", label: "Geography" },
  { id: "economics", label: "Economics" },
  { id: "business", label: "Business Studies" },
  { id: "art", label: "Art & Design" },
  { id: "music", label: "Music" },
  { id: "foreign-language", label: "Foreign Languages" },
];

export default function DemoClassStudent() {
  const router = useRouter();
  const { data: session, status, update } = useSession();

  const [formValue, setFormValue] = useState({
    datetime: null,
    contact: "",
    subjects: "",
  });
  // add data to cookie and redirect to login page if not logged in
  useEffect(() => {
    if (!session && formValue) {
      localStorage.setItem("formValue", JSON.stringify(formValue));
    }
  }, [session]); // remove formValue from deps

  const [loading, setLoading] = useState(false);
  const OnSubmit = async (data) => {
    setLoading(true);
    if (!session) {
      localStorage.setItem("formValue", JSON.stringify(data)); // store only once
      router.push("/login?callbackUrl=/?autoSubmit=true");
      return;
    }

    try {
      const response = await fetch("/api/student/student-class-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();

      if (res.status === 200) {
        setLoading(false);
        toast.success(res.message || "submitted successfully");
        localStorage.removeItem("formValue");
        await update();
        window.location.replace("/");
      } else {
        toast.error(res.message || "Error submitting form. Try again later.");
      }
    } catch (error) {
      toast.error(error || "something went wrong try after somee time");
    } finally {
      // revoke the items from local storage
      localStorage.removeItem("formValue");

      setLoading(false);
    }
  };

  const form = useForm({
    resolver: zodResolver(formSchema),

    defaultValues: {
      contact: "",
      subjects: "",
      datetime: null,
    },
  });

  useEffect(() => {
    const saved = localStorage.getItem("formValue");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.contact) form.setValue("contact", parsed.contact);
      if (parsed.subjects) form.setValue("subjects", parsed.subjects);
      if (parsed.datetime) form.setValue("datetime", new Date(parsed.datetime));
    }
  }, [form]);

  useEffect(() => {
    if (session && typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("autoSubmit") === "true") {
        const saved = localStorage.getItem("formValue");
        if (saved) {
          const parsed = JSON.parse(saved);
          OnSubmit(parsed);
        }
      }
    }
  }, [session]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(OnSubmit)} className=" space-y-4">
        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="datetime">Date time</FormLabel>
              <FormControl>
                <DateTimePicker
                  disabled={(date) => date < new Date()}
                  granularity="second"
                  jsDate={field.value || null}
                  onJsDateChange={(date) => {
                    if (date?.getTime() !== field.value?.getTime()) {
                      field.onChange(date);
                    }
                  }}
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
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
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
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          submit{" "}
        </Button>
        {/* {loading ?
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                            : 'Submit'}
                    </Button>
                    : <Link href="/api/auth/signin"><Button className="mt-3">Sign in to submit</Button></Link>} */}
      </form>
    </Form>
  );
}
