import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Button } from "../ui/button"
import { auth } from '@/auth'
import Link from "next/link"
import prisma from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import studentlearn from "../../public/studentlearn.svg"
import teacher from "../../public/teacher.svg"

import DemoClassStudent from "../student/demo-class-form"
import TeacherDashboard from "./teacher-dashboard"
import StudentDashboard from "../student/student-dashboard"
import { checkUserApplication } from "@/lib/teacher/teacher-info"


async function initialUserCheck() {
    const session = await auth()
    const teacherApplication = await checkUserApplication()
    if (session) {
        if (session.user.role === "teacher") {
            return (
                <TeacherDashboard />
            )
        }
        if (session.user.role === "student") {
            return (
                <StudentDashboard />
            )
        }
        if (session.user.role === "user" && teacherApplication) {
            return (
                (<div>
                    <Card>
                        <CardHeader>
                            <CardTitle>welcome {session.user.name} <Badge variant="green">pending</Badge>  </CardTitle>
                            {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <p>
                                Your application for teaching with subjects <span className=" font-bold"> {teacherApplication.subjects}</span> is pending. We will get back to you soon.
                            </p>
                        </CardContent>
                    </Card>
                </div>)

            )
        }
        if (session.user.role === "user" && !teacherApplication && !demoClass) {

            return (
                <>
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
                    <div className="flex flex-wrap md:h-screen">
                        <div className=" my-16 sm:w-1/2 sm:my-auto ">

                            <Image alt="" priority={true} src={teacher} />

                        </div>
                        <div className="w-full sm:w-1/2 sm:my-16 md:my-auto">
                            <p className="flex flex-col  space-y-4 md:space-y-7 text-center px-6">
                                <span className=" text-3xl md:text-6xl font-medium">Teach when you want and earn</span>
                                <span> Hi <span className=" font-bold"> {session ? session.user.name : "Guest"}</span> want some extra income by teaching?
                                    Apply to be a teacher and start earning by teaching students.</span>
                                <span>
                                    <Button color="primary">
                                        <Link href="/teacher-application">
                                            Apply
                                        </Link>
                                    </Button>
                                </span>
                            </p>

                        </div>



                    </div >

                </>
            )
        }

    }





    else {

        return (
            <>
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
                <div className="flex flex-wrap md:h-screen">
                    <div className=" my-16 sm:w-1/2 sm:my-auto ">

                        <Image alt="" priority={true} src={teacher} />

                    </div>
                    <div className="w-full sm:w-1/2 sm:my-16 md:my-auto">
                        <p className="flex flex-col  space-y-4 md:space-y-7 text-center px-6">
                            <span className=" text-3xl md:text-6xl font-medium">Teach when you want and earn</span>
                            <span> Hi <span className=" font-bold"> {session ? session.user.name : "Guest"}</span> want some extra income by teaching?
                                Apply to be a teacher and start earning by teaching students.</span>
                            <span>
                                <Button color="primary">
                                    <Link href="/teacher-application">
                                        Apply
                                    </Link>
                                </Button>
                            </span>
                        </p>

                    </div>



                </div >

            </>
        )
    }
}

export default initialUserCheck
