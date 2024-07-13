"use client"

import Link from "next/link";
import { useState } from "react"

import { IoIosMenu } from "react-icons/io";
import { Button } from "./button";
import { ModeToggle } from "./mode-toggle";
export default function Sidebar() {
  const [state, setState] = useState(false)
  return (
    <div>
      <div className="md:hidden">
        <button
          className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
          onClick={() => setState(!state)}
        ><IoIosMenu />

          {/* <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg> */}
        </button>
      </div>


      <aside id="sidebar-multi-level-sidebar" className={`top-0 left-0 z-40 w-50 md:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"}`} aria-label="Sidebar">
        <div className="h-full px-3 py-4  ">
          <Link href="/" className="flex items-center ps-2.5 mb-5">
            <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">teachoo</span>
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/admin-dashboard" className="flex items-center p-2 rounded-lg">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin-dashboard/teachers" className="flex items-center p-2 rounded-lg">  teachers</Link>
            </li>

          </ul>
          <ul className="pt-4 mt-4 space-y-2 font-medium ">
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </aside>

    </div >

  )
}


