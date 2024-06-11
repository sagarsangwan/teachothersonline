"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react"
import { signIn } from "next-auth/react"
import { signOut } from "next-auth/react"
import AdminButton from "./admin-button"
export default function UserAvatar() {
    const { data: session, status } = useSession()
    const userRole = session?.user.role
    console.log(userRole)
    if (status === "authenticated")
        return (
            <div className="">
                {/* {session.user.role === "admin" ? <Link href="/admin-dashboard">{session.user.role}</Link> : ""}
                {status} */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>


                        <Avatar>
                            {/* <AvatarFallback>{session.user.name.substring(0, 1)}</AvatarFallback> */}
                            <AvatarImage src={session.user.image} />


                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>

                        <DropdownMenuItem>
                            <Link href="/profile">{session.user.name}</Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Link href="/api/auth/signout">Sign out</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


            </div>
        )
    return <Link href="/api/auth/signin"><Button>Sign in</Button></Link>
}