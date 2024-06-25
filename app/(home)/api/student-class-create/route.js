import { NextResponse } from "next/server"
import moment from "moment"
import { auth } from "@/auth"
import prisma from "@/lib/prisma"
export async function POST(req, res) {
    const session = await auth()
    if (!session) {
        return NextResponse.unauthorized("Unauthorized")
    }
    let existingClass = null

    const existingStudent = await prisma.Student.findUnique({
        where: { userId: session.user.id }
    });

    if (existingStudent) {
        existingClass = await prisma.OneToOneClass.findFirst({
            where: {
                studentId: existingStudent.id,
                type: "demo"
            }
        });
    }

    if (existingClass && existingStudent) {
        return NextResponse.json({ message: "You have already submitted a demo class", status: 400 }, { data: existingClass })
    }
    if (existingStudent && !existingClass) {
        const body = await req.json();
        const { time_of_class, date_of_class, contact, subjects } = body;
        let dateTime = new Date(date_of_class);
        console.log(subjects, "subjects")
        const date_ = dateTime.toISOString().slice(0, 10);
        const class_date_time_string = `${date_}T${time_of_class}:00.000Z`;
        const class_date_time = new Date(class_date_time_string);
        try {
            const class_ = await prisma.OneToOneClass.create({
                data: {
                    subject: subjects,
                    startTime: class_date_time,
                    endTime: moment(class_date_time).add(1, "hour").toDate(),
                    type: "demo",
                    teachingMode: "online",
                    student: {
                        connect: {
                            id: existingStudent.id
                        }
                    }

                }
            })
            return NextResponse.json({ message: "Class submitted successfully", data: class_, status: 200 })
        } catch (error) {
            console.error(error)
            return NextResponse.json({ message: "Error submitting form. Try again later.", status: 400 })
        } finally {
            await prisma.$disconnect();
        }
    }

    const body = await req.json();
    const { time_of_class, date_of_class, contact, subjects } = body;
    let dateTime = new Date(date_of_class);
    const date_ = dateTime.toISOString().slice(0, 10);
    const class_date_time_string = `${date_}T${time_of_class}:00.000Z`;
    const class_date_time = new Date(class_date_time_string);
    try {
        const student = await prisma.Student.create({
            data: {
                email: session.user.email,
                name: session.user.name,
                contact: contact,
                subjects: [subjects],
                userId: session.user.id,

            }
        })
        const user = await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                role: "student",
                Student: {
                    connect: {
                        id: student.id
                    }
                }
            }
        })
        const class_ = await prisma.OneToOneClass.create({
            data: {
                subject: subjects,
                startTime: class_date_time,
                endTime: moment(class_date_time).add(1, "hour").toDate(),
                type: "demo",
                teachingMode: "online",
                student: {
                    connect: {
                        id: student.id
                    }
                }

            }
        })
        return NextResponse.json({ message: "Class submitted successfully", data: class_, status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error submitting form. Try again later.", status: 400 })
    } finally {
        await prisma.$disconnect();
    }
}