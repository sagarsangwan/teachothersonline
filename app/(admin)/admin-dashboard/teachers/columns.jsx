"use client"
import { IoIosMore } from "react-icons/io";
import { LuArrowUpDown } from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const columns = [
    {
        accessorKey: "id",
        Header: "ID",

    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <LuArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
    }, {
        accessorKey: "subittedAt",
        Header: "Submitted At",
    },
    {
        accessorKey: "user",
        Header: "User",
        cell: ({ row }) => {
            const applicant = row.original
            { applicant.verified }
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const applicant = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <IoIosMore className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(applicant.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            {/* check if applicant is verified or nor */}
                            {applicant.verified === "true" ? <Link href="/">un verify</Link> : <Link href="/"> verify</Link>}
                        </DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]