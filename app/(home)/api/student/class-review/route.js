import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
export async function POST(req, res) {
    const session = await auth()
    if (!session) {
        return NextResponse.unauthorized("Unauthorized")
    }
    const body = await req.json();
    const { classId, teacherId, classType, studentId, classRating, classReview, teacherRating, teacherReview, } = body;
    try {
        const reviewByStudent = await prisma.ClassReviewByStudent.create({
            data: {
                rating: +classRating,
                type: classType,
                review: classReview,
                student: {
                    connect: {
                        id: studentId
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
                        id: studentId
                    }
                },
                teacher: {
                    connect: {
                        id: teacherId
                    }
                }

            }
        })
        return NextResponse.json({ message: "your review submitted successfully", data: { reviewByStudent, reviewByStudentForTeacher }, status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error submitting form. Try again later.", status: 400 })
    } finally {
        await prisma.$disconnect();
    }
}