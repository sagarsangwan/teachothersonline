import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { auth } from '@/auth'
import Link from "next/link"
import prisma from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { Separator } from "../ui/separator"
async function checkUserApplication() {
    const session = await auth()
    if (!session) {
        return null
    }
    const teacherApplication = await prisma.teacherApplication.findUnique({
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
async function checkIsTeacherOrNot() {
    const session = await auth()

    const teacherApplication = await checkUserApplication()


    // Check if the user is a teacher or is there an application pending
    if (session && session.user.role === "teacher") {
        return (
            <div>hii teacher</div>
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
            <div>
                <div>
                    <Card>
                        <CardHeader>

                        </CardHeader>
                        <CardContent className="justify-center text-center content-center">
                            <p>
                                Hi <span className=" font-bold"> {session ? session.user.name : "Guest"}</span> want some extra income by teaching?
                                Apply to be a teacher and start earning by teaching students.
                            </p>


                            <Separator className="my-4" />


                            <p>Book a one to one free demo class </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button color="primary">
                                <Link href="/teacher-application">
                                    Apply
                                </Link>
                            </Button>
                            <Button color="primary">
                                <Link href="/teacher-application">
                                    Book a demo class
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                </div>

            </div >

        )
    }
}

export default checkIsTeacherOrNot
