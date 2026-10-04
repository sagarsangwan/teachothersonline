import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { StreamClient } from "@stream-io/node-sdk";
import crypto from "crypto";

export async function PUT(req, { params }) {
    const { id } = await params
    const classId = id
    const session = await auth()
    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }
    const current_teacher = await prisma.teacher.findUnique({
        where: {
            userId: session.user.id
        }
    })
    if (!current_teacher) {
        return NextResponse.json({ message: "Teacher not found", status: 404 })
    }
    const oneToOneClass = await prisma.oneToOneClass.findUnique({
        where: {
            id: classId
        },
        include: {
            student: true
        }
    })
    if (!oneToOneClass) {
        return NextResponse.json({ message: "Class not found", data: classId, status: 404 })
    }
    if (oneToOneClass.status !== "REQUESTED" && oneToOneClass.teacherId && oneToOneClass.teacherId !== current_teacher.id) {
        return NextResponse.json({ message: "Class already booked by another teacher", status: 403 })
    }

    try {
        // Initialize Stream Node SDK
        const streamApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY;
        const streamApiSecret = process.env.STREAM_VIDEO_API_SECRET;
        const streamClient = new StreamClient(streamApiKey, streamApiSecret);

        // Generate meeting ID and create Call on Stream server
        const meetingId = crypto.randomUUID();
        const call = streamClient.video.call('private_meeting', meetingId);
        
        const studentDetails = { user_id: oneToOneClass.student.userId, role: "call_member" }
        const teacherDetails = { user_id: session.user.id, role: "call_member" }
        const startsAt = new Date(oneToOneClass.startTime).toISOString();

        await call.getOrCreate({
            data: {
                members: [teacherDetails, studentDetails],
                starts_at: startsAt,
                custom: { description: `This is a ${oneToOneClass.type} class of ${oneToOneClass.subject}. Join this meeting on given time.` }
            }
        });

        // Update DB
        const updatedClass = await prisma.oneToOneClass.update({
            where: {
                id: classId
            },
            data: {
                status: "CONFIRMED",
                meetingId,
                teacher: {
                    connect: {
                        id: current_teacher.id
                    }
                }
            }
        })

        return NextResponse.json({ message: "Class booked successfully", data: updatedClass }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Class not booked", data: classId }, { status: 400 })
    }
}
