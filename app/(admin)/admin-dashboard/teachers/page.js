
import { columns } from "./columns";
import { DataTable } from "./data-table";
import prisma from "@/lib/prisma"
async function page() {
    const applicants = await prisma.TeacherApplication.findMany(
        {
            include: {
                user: true
            },
        }
    )
    // const initial 


    return (

        <div>
            <h1>Teachers</h1>
            <DataTable columns={columns} data={applicants} />
        </div>
    )
}

export default page
