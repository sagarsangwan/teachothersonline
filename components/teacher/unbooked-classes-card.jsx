import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import moment from "moment";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
async function returnClassTime(startTime) {
    const class_datetime = moment(startTime)
    const class_time = class_datetime.format('HH:mm')
    return class_time
}
async function returnClassDate(startTime) {
    const class_datetime = moment(startTime)
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
    return class_date
}
async function unbookedClassesCard(onetooneclasses) {

    return (
        <div>
            {onetooneclasses.map((class_) => (
                <Card key={class_.id} className="w-[350px]">
                    <CardHeader>
                        <CardTitle >
                            <div className="flex justify-between">
                                <span> Demo class</span>
                                <Badge variant={`${class_.Booked ? "green" : "destructive"}`} > {class_.Booked ? "booked" : "not booked"} </Badge>
                            </div>
                        </CardTitle>
                        <CardDescription>
                            {class_.student.name} wants to take a <span className=" font-bold"> {class_.teachingMode}</span> demo class for {class_.subject} at {returnClassTime(class_.startTime)} on {returnClassDate(class_.startTime)}

                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Book class</Button>

                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default unbookedClassesCard
