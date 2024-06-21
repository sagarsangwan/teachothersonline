"use client";
import { signIn, signOut } from "next-auth/react"
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Spinner from "../ui/spinner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react"
export default function UserAvatar() {
    const { data: session, status } = useSession();


    if (status === "loading")
        return (
            <Spinner />)
    if (status === "authenticated")
        return (
            <div className="flex">


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>


                        <Avatar>
                            <AvatarImage src={session.user.image} />


                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>

                        <DropdownMenuItem>
                            <Link href="/profile">{session.user.name}</Link>
                        </DropdownMenuItem>
                        {session.user.role === "admin" &&
                            <DropdownMenuItem>
                                <Link href={"/admin-dashboard"}>Admin</Link>
                            </DropdownMenuItem>}
                        {session.user.role === "teacher" &&
                            <div>
                                <DropdownMenuItem>
                                    <Link href={"/teacher-dashboard"}>dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/teacher-booked-classes"}>Your classes</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/teacher-book-new-class"}>Book classes</Link>
                                </DropdownMenuItem>
                            </div>
                        }
                        <DropdownMenuItem>
                            <Button size="sm" onClick={() => signOut()} >Sign out</Button>
                            {/* <Link href="/api/auth/signout">Sign out</Link> */}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>


            </div>
        )
    return <Button onClick={() => signIn()}>Sign in</Button>
}
