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
import { Separator } from "../ui/separator"
import studentlearn from "../../public/studentlearn.svg"
import teacher from "../../public/teacher.svg"
import { Input } from "../ui/input"
import DemoClassStudent from "../student/demo-class-form"
async function checkUserApplication() {
    const session = await auth()
    if (!session) {
        return null
    }
    const teacherApplication = await prisma.Teacher.findUnique({
        where: {
            userId: session.user.id
        },
        include: {
            user: true
        }
    })
    if (teacherApplication) {
        return teacherApplication
    }
    return null
}
async function initialUserCheck() {
    const session = await auth()

    const teacherApplication = await checkUserApplication()


    // Check if the user is a teacher or is there an application pending
    if (session && session.user.role === "teacher") {
        return (
            <div>hii teacher</div>
        )
    }
    if (session && session.user.role === "student") {
        return (
            <div>hii student</div>
        )
    }





    if (teacherApplication) {
        return (
            (<div>
                <Card>
                    <CardHeader>
                        <CardTitle>welcome {session.user.name} <Badge variant="green">pending</Badge>  </CardTitle>
                        {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <p>
                            Your application for teaching with subjects <span className=" font-bold"> {teacherApplication.subjects} {teacherApplication.user.name}</span> is pending. We will get back to you soon.
                        </p>
                    </CardContent>
                </Card>
            </div>)

        )
    }
    else {

        return (
            <>
                <div className="flex flex-wrap md:h-screen">
                    <div className="w-full my-16 sm:w-1/2  md:my-auto sm:px-6">
                        <p className="flex flex-col space-y-4 md:space-y-7">
                            <span className=" text-2xl md:text-5xl font-medium">Book a class</span>
                            <span>Request a demo, start learning</span>
                            <span>
                                {/* <Input />
                            <Input />
                            <Input /> */}
                                {/* <Button color="primary">
                                    <Link href="/teacher-application">
                                        Book a demo class
                                    </Link>
                                </Button> */}
                            </span>
                        </p>
                        <div className="">
                            <DemoClassStudent />
                        </div>

                    </div>
                    <div className="sm:w-1/2 sm:my-auto ">

                        <Image alt="" src={studentlearn} />

                    </div>


                </div >
                <div className="flex flex-wrap md:h-screen">
                    <div className=" my-16 sm:w-1/2 sm:my-auto ">

                        <Image alt="" src={teacher} />

                    </div>
                    <div className="w-full sm:w-1/2 sm:my-16 md:my-auto">
                        <p className="flex flex-col  space-y-4 md:space-y-7 text-center">
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
