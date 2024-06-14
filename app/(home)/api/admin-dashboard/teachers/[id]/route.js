import prisma from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
export async function POST(request, { params }) {
    try {
        const applicantId = params.id
        const session = await auth()

        if (session.user.role !== "admin") {
            return NextResponse.unauthorized("Unauthorized")
        }
        const applicant = await prisma.TeacherApplication.findUnique({
            where: { id: applicantId },
            include: { user: true },
        })
        if (!applicant) {
            return NextResponse.error({ status: 400 }, "user not found")
        }

        // if verified is true then make it false
        if (applicant.verified === true) {
            const updatedApplicant = await prisma.TeacherApplication.update({
                where: { id: applicantId },
                data: {
                    verified: false
                }
            })
            const applicantUpdatedUser = await prisma.User.update({
                where: { id: applicant.user.id },
                data: {
                    isTeacher: false
                }
            })
            revalidatePath("/admin-dashboard/teachers");
            return NextResponse.json(updatedApplicant)
        }
        const updatedApplicant = await prisma.TeacherApplication.update({
            where: { id: applicantId },
            data: {
                verified: true
            }
        })
        const applicantUpdatedUser = await prisma.User.update({
            where: { id: applicant.user.id },
            data: {
                isTeacher: true
            }
        })



        revalidatePath("/admin-dashboard/teachers");
        return NextResponse.json(updatedApplicant)
    } catch {

        return NextResponse.error({ status: 400 }, "user not found")
    }



}