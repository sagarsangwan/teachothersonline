import getCurrentClass from "./get-current-class";
export async function bookClassAndCreateMeeting(id, client) {

    const class_ = await getCurrentClass(id)

    let meetingId;
    let classlink;
    let Booked = false
    if (class_) {
        const startsAt = class_.startTime.toISOString()
        console.log("inside create meeting", class_.studentId)
        try {
            const id = crypto.randomUUID()
            const call = client.call("private_meeting", id,)
            const members = [{ user_id: class_.studentId, role: "call_member" }]
            const response = await call.getOrCreate({
                data: {
                    members,
                    starts_at: startsAt,
                    custom: { description: `this meeting is for ${class_.subject} at ${class_.startTime.toISOString()}` }
                }
            })
            console.log(response, "response from create call{{{{{{{{{{{{{{{{}}}}}}}}}}}}}}}}}}}}}}}}")
            // setCall(call)
            meetingId = call.id
            Booked = true
            classlink = `${process.env.NEXT_PUBLIC_BASE_URL}/meetings/${meetingId}`

            console.log(call, "create call k ander call print")


        } catch (error) {
            console.log(error)
        }

    }

    if (classlink) {
        try {
            const response = await fetch(`/api/teacher/handle-classes/${id}`, {
                method: "PUT",
                body: JSON.stringify({ Booked, meetingId, classlink })


            })
            const res = await response.json()
            if (res.status === 200) {
                console.log(res)
                return {
                    status: 200,
                    res: res
                }

            }
            else {
                console.log(res)
                return {
                    status: 400,
                    res: res

                }
            }
        } catch (error) {
            console.log(error)
            return {
                status: 400,
                res: "something went wrong"
            }
        }
    } else {
        return {
            status: 400,
            res: "something went wrong"
        }
    }


}