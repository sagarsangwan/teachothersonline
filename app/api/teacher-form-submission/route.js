import { NextResponse } from "next/server"
export async function postTeacherFormSubmission(req, res) {
    const { body } = req
    const { name, email, subjects, contact, experience } = body
    console.log(name + email + subjects + contact + experience)
    return NextResponse.json(name + email + subjects + contact + experience)
    // const teacher = await prisma.teacher.create({
    //     data: {
    //         name,
    //         email,
    //         subjects: {
    //             set: subjects
    //         },
    //         contact,
    //         experience
    //     }
    // })

    // res.json(teacher)
}