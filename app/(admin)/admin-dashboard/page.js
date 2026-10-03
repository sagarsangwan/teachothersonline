import { teacherColums } from "./_components/teachers/columns"
import { TeacherDataTable } from "./_components/teachers/data-table"
import AllUserCount from "./_components/all-user-card"
import AllApplicantCount from "./_components/teachers/all-applicant-card"
import AllStudentCount from "./_components/all-student-card"
import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

async function page() {
    const session = await auth()
    if (!session) {
        redirect("/")
    } else {
        if (session.user.role !== "admin") {
            redirect("/")
        }
    }

    let applicants = []
    try {
        applicants = await prisma.Teacher.findMany(
            {
                include: {
                    user: true
                },
            }
        )
    } catch {
        return applicants
    }

    return (
        <div className="flex flex-wrap gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <AllUserCount />
                <AllApplicantCount />
                <AllStudentCount />
            </div>
            <div className="">
                <div className="">
                    <p className="text-lg mb-5">Teachers</p>
                    <TeacherDataTable columns={teacherColums} data={applicants} />
                </div>
            </div>
        </div>
    )
}


export default page
