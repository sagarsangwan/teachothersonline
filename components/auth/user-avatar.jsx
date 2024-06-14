"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import spinner from "../ui/spinner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react"
export default function UserAvatar() {
    const { data: session, status } = useSession();
    let userrole;
    if (status === "authenticated") {
        userrole = session.user.role
    }
    if (status === "loading")
        return (
            <spinner />)
    if (status === "authenticated")
        return (
            <div className="flex">


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
                            {session.user.role === "admin" ? <Link href={"/admin-dashboard"}>Admin</Link> : ""}
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