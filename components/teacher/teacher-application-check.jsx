import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { auth } from '@/auth'


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
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>

        )
    }
}

export default checkIsTeacherOrNot
