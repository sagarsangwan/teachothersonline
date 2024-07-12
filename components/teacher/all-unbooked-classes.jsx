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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import getCurrentClass from "./get-current-class";
import { updateClassLink } from "./book-class";


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
    const [loading, setLoading] = useState(false)
    const [call, setCall] = useState(null)
    const router = useRouter()
    const { data: session, status } = useSession()
    const client = useStreamVideoClient()
    async function bookClass(id) {
        setLoading(true)
        const class_ = await getCurrentClass(id)
        let meetingId;
        let classlink;
        let Booked = false
        if (class_) {
            const startsAt = class_.startTime.toISOString()
            console.log("inside create meeting", class_.studentId)
            // await createUser(client, class_)
            try {
                const id = crypto.randomUUID()
                const call = client.call("private_meeting", id,)
                // create a streamuser 

                const studentDetails = { user_id: class_.student.userId, role: "call_member" }
                const teacherDetails = { user_id: session.user.id, role: "call_member" }
                await call.getOrCreate({
                    data: {
                        members: [teacherDetails, studentDetails],
                        starts_at: startsAt,
                        custom: { description: `This is a ${class_.type} class of ${class_.subject} from  ${class_.startTime.toISOString().slice(11, 16)}} to ${class_.endTime.toISOString().slice(11, 16)}} on ${class_.endTime.toISOString().slice(0, 10)}}. Join this meeting on given time` }
                    }
                })
                setCall(call)
                meetingId = call.id
                Booked = true
                classlink = `${process.env.NEXT_PUBLIC_BASE_URL}/meetings/${meetingId}`

                console.log(call, "create call k ander call print")


            } catch (error) {
                console.log(error)
                toast.error("something went wrong try after sometime")

            }

        }


        if (Booked) {
            const body = { Booked, meetingId, classlink }
            const res = await updateClassLink(id, body)
            if (res.status === 200) {

                toast.success("class booked successfully")
                setLoading(false)
                router.refresh();
            } else {
                toast.error("something went wrong try after sometime")
                setLoading(false)
            }

        } else {
            setLoading(false)
            toast.error("something went wrong try after sometime")

        }

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
                                        <span className=" font-bold"> {class_.teachingMode}</span> demo class for {class_.subject} at {class_.startTime.toISOString().slice(11, 16)} on {returnClassDate(class_.startTime)}
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
                                                    Do you want to book this class are you free at {class_.startTime.toISOString().slice(11, 16)} on {returnClassDate(class_.startTime)}
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
