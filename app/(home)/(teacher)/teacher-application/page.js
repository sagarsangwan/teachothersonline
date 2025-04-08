"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import validator from "validator";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import isAuth from "@/lib/isAuth";

const formSchema = z.object({
  education: z.string().min(1, { message: "Education is required" }),
  experience: z.string().min(1, { message: "Experience is required" }),
  contact: z.string().refine(validator.isMobilePhone, {
    message: "Invalid phone number",
  }),
  resume: z.any(),
  subjects: z.array(z.string()).nonempty({
    message: "Please select at least one subject",
  }),
});

const SUBJECTS = [
  "Math",
  "Science",
  "English",
  "History",
  "Foreign Language",
  "Other",
];

const TeacherApplication = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      education: "",
      experience: "",
      contact: "",
      resume: undefined,
      subjects: [],
    },
  });

  const fileRef = form.register("resume");

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("education", data.education);
      formData.append("experience", data.experience);
      formData.append("contact", data.contact);
      if (data.resume?.[0]) {
        formData.append("resume", data.resume[0]);
      }
      formData.append("subjects", JSON.stringify(data.subjects));

      const response = await fetch("/api/teacher/teacher-form-submission", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === 201) {
        toast.success(result.message || "Application submitted successfully");
        form.reset();
        router.push("/");
      } else {
        toast.error(
          result.message ||
            "You have already submitted an application. Redirecting..."
        );
        form.reset();
        router.push("/");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (session?.user?.role !== "user") {
    router.push("/");
    return null;
  }

  return (
    <div className="py-7">
      <div className="text-center mb-8">
        <p>
          Hi! We’re excited to have you on board. Please fill out the form to
          apply as a teacher. We will get back to you soon.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Education */}
          <FormField
            control={form.control}
            name="education"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Education</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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

          {/* Experience */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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

          {/* Contact */}
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Resume Upload */}
          <FormField
            control={form.control}
            name="resume"
            render={() => (
              <FormItem>
                <FormLabel>Resume</FormLabel>
                <FormControl>
                  <Input id="resume" type="file" {...fileRef} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Subjects */}
          <FormField
            control={form.control}
            name="subjects"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose Subjects</FormLabel>
                <div className="flex flex-wrap gap-4">
                  {SUBJECTS.map((label) => (
                    <label key={label} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={label}
                        checked={field.value.includes(label)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...field.value, label]
                            : field.value.filter((s) => s !== label);
                          field.onChange(updated);
                        }}
                      />
                      <span>{label}</span>
                    </label>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

const currentFullUrl =
  process.env.NEXT_PUBLIC_BASE_URL + "/teacher-application";
export default isAuth(TeacherApplication, currentFullUrl);
