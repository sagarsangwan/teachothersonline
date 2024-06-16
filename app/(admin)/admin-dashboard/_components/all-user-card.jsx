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



async function countUsers() {
    let userCount = 0;
    try {
        userCount = await prisma.user.count();
    } catch (error) {
        console.error('Error counting users:', error);
    } finally {
        await prisma.$disconnect();
    }
    return userCount;

}
async function allUserCount() {
    return (
        <Card className="px-3 " >
            <div className="flex justify-between gap-10 py-3">
                <p className=" text-[10px]">Total Users</p>
                <PiDotsThree />

            </div>

            <CardContent className="text-start">
                <p className="text-lg font-medium leading-none">
                    {countUsers()}
                </p>
            </CardContent>
            {/* <p className=" text-[10px]">Total Users</p> */}
        </Card>
    )
}

export default allUserCount
