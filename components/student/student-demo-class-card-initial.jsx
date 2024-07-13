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
async function studentClassStatusCardInitial(demoClass) {
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
                        <Badge variant={`${demoClass.Booked ? "green" : "destructive"}`} > {demoClass.Booked ? "booked" : "not booked"} </Badge>

                    </div>
                </CardTitle>
                <CardDescription>
                    <p>
                        You have booked a <span className=" font-bold"> {demoClass.teachingMode}</span> demo class with us for {demoClass.subject} at {moment(demoClass.startTime).local().format("YYYY-MM-DD HH:mm:ss").slice(11, 16)}  on {class_date}
                        {demoClass.Booked ? demoClass.classlink ? <span className="mt-3"> <br /> Join the meeting on time using below button</span> : <span> your request fo demo class is accepted wait until our teacher upload a link  </span> : <span> wait till any of out teacher accept your request</span>}</p>


                </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                {demoClass.classlink && <Button > <Link href={demoClass.classlink}>Go To Meeting</Link> </Button>}
            </CardFooter>
        </Card>
    )
}

export default studentClassStatusCardInitial