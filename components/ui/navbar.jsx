"use client";
import adminButton from "../auth/admin-button";
import * as React from "react"
import { useSession } from "next-auth/react";
import UserAvatar from "../auth/user-avatar";

import Link from "next/link"
import { IoIosMenu } from "react-icons/io";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
    const { data: session, status } = useSession()
    const [state, setState] = React.useState(false)
    const menus = [
        // { title: "Home", path: "/your-path" },
        // { title: "My Blog", path: "/your-path" },
        // { title: "About Me", path: "/your-path" },
        // { title: "Contact ME", path: "/your-path" },
    ]

    return (
        <nav className="  container  mt-5">
            <div className="items-center max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <Link href="/">
                        <h1 className=" text-xl md:text-3xl font-bold">
                            Teach others online
                        </h1>
                    </Link>
                    <div className="md:hidden">
                        <button
                            className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
                            onClick={() => setState(!state)}
                        ><IoIosMenu />

                            {/* <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> */}
                        </button>
                    </div>
                </div>
                <div
                    className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"
                        }`}
                >
                    <ul className="justify-end items-end space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {menus.map((item, idx) => (
                            <li key={idx} className="text-gray-400 hover:bg-secondary/80">
                                <Link href={item.path}>{item.title}</Link>
                            </li>
                        ))}
                        <li >
                            <ModeToggle />
                        </li>

                        <li >
                            <UserAvatar />
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}