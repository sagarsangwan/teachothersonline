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
async function studentClassStatusCard(demoClass) {
    const session = await auth()
    const class_datetime = moment(demoClass.startTime)
    const class_time = class_datetime.format('HH:mm')
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
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle >
                    <div className="flex justify-between">
                        <span> Demo class</span>
                        <Badge variant={`${demoClass.Booked ? "green" : "destructive"}`} > {demoClass.Booked ? "booked" : "not booked"} </Badge>
                    </div>
                </CardTitle>
                <CardDescription>
                    Hi, {demoClass.student.name} You have booked a <span className=" font-bold"> {demoClass.teachingMode}</span> demo class with us for {demoClass.subject} at {class_time} on {class_date}   {demoClass.classlink ? <span>join this link on sharp {class_time}  {demoClass.classlink}</span> : <span> your request fo demo class is accepted wait until our teacher upload a link  </span>}

                </CardDescription>
            </CardHeader>
            <CardContent>

            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>

            </CardFooter>
        </Card>
    )
}

export default studentClassStatusCard