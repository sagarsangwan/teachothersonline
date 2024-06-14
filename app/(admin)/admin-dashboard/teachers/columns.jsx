"use client"
import { LuArrowUpDown } from "react-icons/lu";
import moment from 'moment'
import { Button } from "@/components/ui/button";

import Link from "next/link";
import VerifyButton from "@/components/VerifyCell";



export const columns = [
    // {
    //     accessorKey: "id",
    //     Header: "ID",

    // },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "email",
        Header: "User",
        cell: ({ row }) => {
            const applicant = row.original.user
            return applicant.email
        }
    },

    {
        accessorKey: "subjects",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Subjects
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "education",
        Header: "Education",
    },
    {
        accessorKey: "resume",
        Header: "Resume",
    }, {
        accessorKey: "experience",
        Header: "Experience",
    }, {
        accessorKey: "contact",
        Header: "Contact",
    }, {
        accessorKey: "verified",
        Header: "Verified",
        cell: ({ row }) => {
            const verified = row.original.verified;
            return (
                <span className={verified ? "text-green-500" : "text-red-500"}>
                    {verified ? "Verified" : "Not Verified"}
                </span>
            )
        },
    }, {
        accessorKey: "subittedAt",
        Header: "Submitted At",
        cell: ({ row }) => {
            const date = row.original.subittedAt
            return (
                moment(date).fromNow()
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