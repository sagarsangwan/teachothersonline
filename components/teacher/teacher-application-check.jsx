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

async function checkUserApplication() {
    const session = await auth()
    if (!session) {
        return null
    }
    const teacherApplication = await prisma.teacherApplication.findUnique({
        where: {
            userId: session.user.id

        }
    })
    if (teacherApplication) {
        console.log(teacherApplication, "----------------------------------------------------------------------------------")
        return teacherApplication
    }
    return null
}
async function checkIsTeacherOrNot() {
    const session = await auth()

    const teacherApplication = await checkUserApplication()
    if (teacherApplication) {
        return (
            (<div>
                <Card>
                    <CardHeader>
                        <CardTitle>welcome {session.user.name}</CardTitle>
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

    // Check if the user is a teacher or is there an application pending
    if (session.user.teacher) {
        return null
    }
    else {

        return (
            <div>
                <Card>

                    <CardHeader>
                        {session.user.name || ""} want some extra income by teaching?{session.user.sessions}
                    </CardHeader>

                    <CardContent >
                        <p>
                            Apply to be a teacher and start earning by teaching students.

                        </p>

                    </CardContent>
                    <CardFooter>
                        <Button color="primary">
                            <Link href="/teacher-application">
                                Apply
                            </Link>
                        </Button>
                    </CardFooter>

                </Card>
            </div >

        )
    }
}

export default checkIsTeacherOrNot
