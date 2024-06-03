import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { auth } from '@/auth'
import Link from "next/link"

async function checkIsTeacherOrNot() {
    const session = await auth()
    if (!session) {
        console.log("You are not logged in")
        return null
    }
    if (session.user.isTeacher === 'True') {
        console.log("You are a teacher")
        return null
    }
    else {

        return (
            <div>
                <Card>

                    <CardHeader>
                        Want some extra income by teaching?
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
