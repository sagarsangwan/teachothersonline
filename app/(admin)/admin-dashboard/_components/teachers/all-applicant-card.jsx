import { Button } from "@/components/ui/button";
import { PiDotsThree } from "react-icons/pi";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/prisma";



async function countTeacherApplicant() {
    let teacherApplicantCount = 0;
    try {
        teacherApplicantCount = await prisma.Teacher.count({
            // where: {
            //     verified: false
            // }
        });
    } catch (error) {
        console.error('Error counting teacher applicants:', error);
    }
    return teacherApplicantCount;
}

async function allApplicantCount() {
    const teacherApplicantCount = await countTeacherApplicant();

    return (
        <Card className="px-3" >
            <div className="flex justify-between gap-10 py-3">
                <p className=" text-[10px]">Total Teacher Applications</p>
                <PiDotsThree />
            </div>

            <CardContent className="text-start">
                <p className="text-lg font-medium leading-none">
                    {teacherApplicantCount}
                </p>
            </CardContent>
        </Card>
    )
}

export default allApplicantCount
