"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReloadIcon } from "@radix-ui/react-icons"
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
function returnClassTime(startTime) {
    const class_datetime = moment(startTime)
    const class_time = class_datetime.format('HH:mm')
    return class_time
}


function returnClassDate(startTime) {
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


function AllUnbookedClasses({ unbooked_classes }) {
    console.log("unbooked_classes=======///////////////////")
    const [loading, setLoading] = useState(false)
    async function bookClass(id) {
        console.log(id)
        try {
            setLoading(true)
            const response = await fetch(`/api/teacher/handle-classes/${id}`, {
                method: "PUT"
                // send id as body

            })
            const res = await response.json()
            if (res.status === 200) {
                console.log("okay hai--------------------------------")
                setLoading(false)
            }
            else {
                console.log("okay nhi hai-------------------")
            }
        } catch (error) {
            console.log(error)
        }

    }
    if (!unbooked_classes) return <div>Loading...</div>;
    return (
        <div>
            <p>sagar</p>
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
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm">
                                                Book class</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Confirm Booking</DialogTitle>
                                                <DialogDescription>
                                                    Do you want to book this class
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex items-center space-x-2">

                                            </div>
                                            <DialogFooter className="sm:justify-start">
                                                {!loading &&
                                                    <Button size="sm" onClick={() => bookClass(class_.id)}>
                                                        Book class</Button>}
                                                {loading &&
                                                    <Button disabled>
                                                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                                                        Please wait
                                                    </Button>}
                                                <DialogClose asChild>
                                                    <Button type="button" variant="secondary">
                                                        No
                                                    </Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>


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

export default AllUnbookedClasses
