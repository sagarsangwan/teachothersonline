"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import returnClassDate from "../return-class-date";
import Link from "next/link";



function AllBookedClasses({ booked_classes, completed_classes, expired_not_completed_classes }) {
    const [loading, setLoading] = useState(false)


    const router = useRouter()
    async function bookClass(id) {

        const Booked = true
        try {
            setLoading(true)
            const response = await fetch(`/api/teacher/book-class/${id}`, {
                method: "PUT",
                body: JSON.stringify({ Booked })


            })
            const res = await response.json()
            if (res.status === 200) {
                toast.success(res.message)
                setLoading(false)
                router.refresh()

            }
            else {
                toast.error(res.message)
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            {booked_classes.length > 0 &&
                <div className="">
                    <div className="mb-4">
                        <h1 className="text-xl font-bold">Your classes</h1>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {booked_classes.map((class_) => (
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
                                        <span className=" font-bold"> {class_.teachingMode}</span> demo class for {class_.subject} at {moment(class_.startTime).local().format("YYYY-MM-DD HH:mm:ss").slice(11, 16)} on {returnClassDate(class_.startTime)}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button size="sm">
                                        <Link href={class_.classlink} >
                                            Join class
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}

                    </div>
                    <div className="flex justify-end mt-3">
                        <Button>View More</Button>
                    </div>
                </div>}


            {completed_classes.length > 0 &&
                <div className="">
                    <div className="mb-4">
                        <h1 className="text-xl font-bold">Completed classes</h1>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {/* {unbookedClassesCard(booked_classes, teacher)} */}
                        {completed_classes.map((class_) => (
                            <Card key={class_.id} className="">
                                <CardHeader>
                                    <CardTitle >
                                        <div className="flex justify-between">
                                            <span> Demo class</span>
                                            <Badge variant="green" > Completed </Badge>
                                        </div>
                                    </CardTitle>
                                    {/* 

                        </CardDescription> */}
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        <span className=" font-bold">You completed a {class_.type} class </span>for {class_.subject} from {moment(class_.startTime).local().format("YYYY-MM-DD HH:mm:ss").slice(11, 16)} to {moment(class_.endTime).local().format("YYYY-MM-DD HH:mm:ss").slice(11, 16)} on {returnClassDate(class_.startTime)}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm">
                                                View class details</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                            <DialogHeader>
                                                <DialogTitle>Details</DialogTitle>
                                                <DialogDescription>


                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="flex items-center space-x-2">

                                            </div>
                                            <DialogFooter className="sm:justify-start">

                                                {/* <Button size="sm" onClick={() => bookClass(class_.id)}>
                                                        Upload class link</Button> */}

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

            {expired_not_completed_classes.length > 0 &&
                <div className="">
                    <div className="mb-4">
                        <h1 className="text-xl font-bold">Expired classes</h1>

                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {/* {unbookedClassesCard(booked_classes, teacher)} */}
                        {expired_not_completed_classes.map((class_) => (
                            <Card key={class_.id} className="">
                                <CardHeader>
                                    <CardTitle >
                                        <div className="flex justify-between">
                                            <span> Demo class</span>
                                            <Badge variant="destructive" > expired </Badge>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        {/* {teacher.subjects.map((subject) => { <span> {subject}</span> })} */}
                                        <span className=" font-bold"> {class_.teachingMode}</span> demo class for {class_.subject} at {moment(class_.startTime).local().format("YYYY-MM-DD HH:mm:ss").slice(11, 16)} on {returnClassDate(class_.startTime)}
                                    </CardDescription>
                                    {/* <TimerComponent starttime={class_.startTime} /> */}
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button size="sm">
                                        reassign class</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>


                </div>
            }

        </div>
    )
}

export default AllBookedClasses
