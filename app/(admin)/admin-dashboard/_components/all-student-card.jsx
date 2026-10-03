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



async function countStudents() {
    let studentsCount = 0;
    try {
        studentsCount = await prisma.Student.count();
    } catch (error) {
        console.error('Error counting students:', error);
    }
    return studentsCount;
}

async function allStudentCount() {
    const studentsCount = await countStudents();

    return (
        <Card className="px-3" >
            <div className="flex justify-between gap-10 py-3">
                <p className=" text-[10px]">Total Students</p>
                <PiDotsThree />
            </div>

            <CardContent className="text-start">
                <p className="text-lg font-medium leading-none">
                    {studentsCount}
                </p>
            </CardContent>
        </Card>
    )
}

export default allStudentCount
