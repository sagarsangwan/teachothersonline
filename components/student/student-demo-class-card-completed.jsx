"use server"
import { auth } from "@/auth"
import moment from "moment"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "../ui/badge"
import Link from "next/link"
import StudentRatingForm from "./student-rating-form"
async function studentClassStatusCardCompleted(demoClass) {
    const session = await auth()
    const class_datetime = moment(demoClass.startTime)
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');

    let class_date;
    if (class_datetime.isSame(today, 'd')) {
        class_date = 'Today';
    } else if (class_datetime.isSame(yesterday, 'd')) {
        class_date = 'Yesterday';
    } else {
        class_date = class_datetime.format('MMMM Do, YYYY'); // or your preferred format
    }

    return (
        <Card className=" w-max-[400px]">
            <CardHeader>
                <CardTitle >
                    <div className="flex justify-between">
                        <span> Demo class</span>
                        <Badge variant="green">completed</Badge>

                    </div>
                </CardTitle>
                <CardDescription>
                    You have completed a {demoClass.type} with us for {demoClass.subject} from  {moment(demoClass.startTime).local().format("YYYY-MM-DD HH:mm:ss").slice(11, 16)} to {moment(demoClass.endTime).local().format("YYYY-MM-DD HH:mm:ss").slice(11, 16)}  on {class_date}


                </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter className="flex justify-end">
                {!demoClass.ClassReviewByStudent && <StudentRatingForm demoClass={demoClass} />}

            </CardFooter>
        </Card>
    )
}

export default studentClassStatusCardCompleted