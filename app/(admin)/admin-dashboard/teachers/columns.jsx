"use client"
import { LuArrowUpDown } from "react-icons/lu";
import moment from 'moment'
import { Button } from "@/components/ui/button";

import Link from "next/link";
import VerifyButton from "@/components/VerifyCell";
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar";


export const teacherColums = [
    {
        accessorKey: "Details",
        header: ({ column }) => {
            return (
                <Button size="sm"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const applicant = row.original.user
            const contact = row.original.contact
            return (
                <div className="flex gap-3 text-[12px]">
                    <div className=" content-center">
                        <Avatar>
                            <AvatarImage src={applicant.image} alt="@shadcn" />
                        </Avatar>
                    </div>
                    <div className="flex flex-wrap">
                        <span>{applicant.name}</span>
                        <span>{applicant.email}</span>
                        <span>{contact}</span>
                    </div>


                </div>
            )
        }
    },

    {
        accessorKey: "subjects",
        header: ({ column }) => {
            return (
                <Button size="sm"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Subjects
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const subjects = row.original.subjects;
            return (
                <span className="text-[12px]">
                    {subjects}
                </span>
            )
        }
    },
    {
        accessorKey: "education",
        Header: "Education",
        cell: ({ row }) => {
            const education = row.original.education;
            return (
                <span className="text-[12px]">
                    {education}
                </span>
            )
        }

    },
    {
        accessorKey: "resume",
        Header: "Resume",
        cell: ({ row }) => {
            const resume = row.original.resume;
            return (
                <span className="text-[12px]">
                    {resume}
                </span>
            )
        }

    }, {
        accessorKey: "experience",
        Header: "Experience",
        cell: ({ row }) => {
            const experience = row.original.experience;
            return (
                <span className="text-[12px]">
                    {experience}
                </span>
            )
        }

    }, {
        accessorKey: "verified",
        Header: "Verified",
        cell: ({ row }) => {
            const verified = row.original.verified;
            return (
                <span className={verified ? "text-green-500 text-[12px]" : "text-red-500 text-[12px]"}>
                    {verified ? "Verified" : "Not Verified"}
                </span>
            )
        },
    }, {
        accessorKey: "subittedAt",

        header: ({ column }) => {
            return (
                <Button size="sm"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Submitted At
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.original.subittedAt
            return (
                <div className="text-[12px]">
                    {moment(date).fromNow()}
                </div>
            )
        }
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const applicant = row.original

            return (
                VerifyButton({ applicantId: applicant.id, verified: applicant.verified })
            )
        },
    },
]