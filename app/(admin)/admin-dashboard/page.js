import { teacherColums } from "./teachers/columns"
import { TeacherDataTable } from "./teachers/data-table"
import allUserCount from "./_components/all-user-card"
import allApplicantCount from "./_components/all-applicant-card"
import allStudentCount from "./_components/all-student-card"
import prisma from "@/lib/prisma"
export default async function page() {
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
    } finally {
        await prisma.$disconnect()
    }
    return (
        <div className="flex flex-wrap gap-6 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {allUserCount()}
                {allApplicantCount()}
                {allStudentCount()}
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
