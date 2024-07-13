import React from 'react'
import studentClassStatusCardInitial from './student-demo-class-card-initial'
import { checkDemoClass } from '@/lib/student-info'
import DemoClassStudent from './demo-class-form'
import studentlearn from "../../public/studentlearn.svg"

import Image from "next/image"
import { Button } from "../ui/button"
import { auth } from '@/auth'
import Link from "next/link"
import prisma from "@/lib/prisma"
import studentClassStatusCardCompleted from './student-demo-class-card-completed'
async function StudentDashboard() {

    const demoClass = await checkDemoClass()
    const session = await auth()
    if (demoClass?.completed) {
        return (
            <div>
                <div className="text-2xl font-medium mb-7">
                    {session ? <span>Hi, {session.user.name}</span> : <span>Hi, Student</span>}
                </div >
                <div>
                    {studentClassStatusCardCompleted(demoClass)}
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="text-2xl font-medium mb-7">
                {session ? <span>Hi, {session.user.name}</span> : <span>Hi, Student</span>}
            </div >
            <div>
                {demoClass ? studentClassStatusCardInitial(demoClass) : <DemoClassFormScreen />}
                {/* {demoClass? :<DemoClassFormScreen />} */}
            </div>
        </div>

    )

}

function DemoClassFormScreen() {
    return (
        <div className="flex flex-wrap md:h-screen">
            <div className="w-full my-16 sm:w-1/2  md:my-auto sm:px-6">
                <p className="flex flex-col space-y-4 md:space-y-7">
                    <span className=" text-2xl md:text-5xl font-medium">Book a class</span>
                    <span>Request a demo, start learning</span>

                </p>
                <div className="sm:w-[238px] md:w-[324px]">
                    <DemoClassStudent />
                </div>

            </div>
            <div className="sm:w-1/2 sm:my-auto ">

                <Image alt="" priority={true} src={studentlearn} />

            </div>


        </div >
    )
}

export default StudentDashboard
