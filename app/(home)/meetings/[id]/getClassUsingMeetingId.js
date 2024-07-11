"use server"
import prisma from "@/lib/prisma";


export async function getClassByMeetingId(meetingId) {
    try {
        const classData = await prisma.class.findFirst({
            where: {
                meetingId,
            },
        });
        return classData;
    } catch (error) {
        console.error("Error in getClassByMeetingId: ", error);
        return null;
    } finally {
        prisma.$disconnect()
    }
}