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
import LandingPage from "../landing-page/landing-page"
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
        if (session.user.role === "user" && !teacherApplication) {
            return (
                <LandingPage session={session} />
            )
        }

    }





    else {
        return (
            <LandingPage session={session} />
        )
    }
}

export default initialUserCheck
