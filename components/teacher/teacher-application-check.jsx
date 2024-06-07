import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
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

        },
        include: {
            application: true
        }
    })
    if (teacherApplication) {
        return teacherApplication
    }
    return null
}
async function checkIsTeacherOrNot() {
    const session = await auth()

    if (checkUserApplication()) {
        return <div>hhhh</div>
    }
    // Check if the user is a teacher or is there an application pending
    if (session.user.teacher || session.user.teacherApplication) {
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
