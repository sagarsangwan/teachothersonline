import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
export async function POST(req, res) {
    const session = await auth()
    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }
    const body = await req.json();
    const { classId, teacherId, classType, classRating, classReview, teacherRating, teacherReview } = body;

    const current_student = await prisma.student.findUnique({
        where: { userId: session.user.id }
    })
    if (!current_student) {
        return NextResponse.json({ message: "Student not found" }, { status: 404 })
    }

    const oneToOneClass = await prisma.oneToOneClass.findUnique({
        where: { id: classId }
    })
    if (!oneToOneClass || oneToOneClass.studentId !== current_student.id) {
        return NextResponse.json({ message: "Unauthorized or class not found" }, { status: 403 })
    }

    const targetTeacherId = oneToOneClass.teacherId || teacherId;

    try {
        const reviewByStudent = await prisma.ClassReviewByStudent.create({
            data: {
                rating: +classRating,
                type: classType,
                review: classReview,
                student: {
                    connect: {
                        id: current_student.id
                    }
                },
                class: {
                    connect: {
                        id: classId
                    }
                }
            }
        })

        const reviewByStudentForTeacher = await prisma.TeacherRating.create({
            data: {
                rating: +teacherRating,
                review: teacherReview,
                student: {
                    connect: {
                        id: current_student.id
                    }
                },
                teacher: {
                    connect: {
                        id: targetTeacherId
                    }
                }

            }
        })
        return NextResponse.json({ message: "your review submitted successfully", data: { reviewByStudent, reviewByStudentForTeacher } }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error submitting form. Try again later." }, { status: 400 })
    }
}