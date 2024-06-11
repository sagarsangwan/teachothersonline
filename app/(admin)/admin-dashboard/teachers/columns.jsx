"use client"
import { IoIosMore } from "react-icons/io";

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const columns = [
    {
        accessorKey: "id",
        Header: "ID",

    },
    {
        accessorKey: "name",
        Header: "Name",
    },

    {
        accessorKey: "subjects",
        Header: "Subjects",
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
        accessorKey: "userId",
        Header: "User",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original

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
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]