import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

function bookClass(id) {

}
async function page() {
    let unbooked_classes = []
    const session = await auth()
    const teacher = await prisma.Teacher.findUnique({
        where: {
            userId: session.user.id
        }
    })
    const teacher_subjects = teacher.subjects[0].split(',');
    try {

        unbooked_classes = await prisma.OneToOneClass.findMany({
            where: {
                Booked: false,
                subject: {
                    in: teacher_subjects
                }
            },
            include: { student: true }
        })

    } catch {
        return null
    } finally {
        await prisma.$disconnect();
    }
    return (
        <div>

            {unbooked_classes.length > 0 &&
                <div className="">
                    <div className="mb-4">
                        <h1 className="text-xl font-bold">Book classes</h1>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {/* {unbookedClassesCard(unbooked_classes, teacher)} */}
                        {unbooked_classes.map((class_) => (
                            <Card key={class_.id} className="">
                                <CardHeader>
                                    <CardTitle >
                                        <div className="flex justify-between">
                                            <span> Demo class</span>
                                            <Badge variant={`${class_.Booked ? "green" : "destructive"}`} > {class_.Booked ? "booked" : "not booked"} </Badge>
                                        </div>
                                    </CardTitle>
                                    {/* 

                        </CardDescription> */}
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        {/* {teacher.subjects.map((subject) => { <span> {subject}</span> })} */}
                                        <span className=" font-bold"> {class_.teachingMode}</span> demo class for {class_.subject} at {returnClassTime(class_.startTime)} on {returnClassDate(class_.startTime)}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button size="sm" onClick={bookClass(class_.id)}>
                                        Book class</Button>
                                </CardFooter>
                            </Card>
                        ))}

                    </div>
                    <div className="flex justify-end mt-3">
                        <Button>View More</Button>
                    </div>
                </div>}
        </div>
    )
}

export default page
