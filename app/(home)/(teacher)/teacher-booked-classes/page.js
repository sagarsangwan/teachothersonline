import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import AllBookedClasses from "@/components/teacher/all-booked-classes";
import moment from "moment";
import { redirect } from "next/navigation";



async function fetchUnbookedClasses() {
  let booked_classes = [];
  let completed_classes = [];
  let expired_not_completed_classes = [];
  const session = await auth();
  if (!session) {
    return redirect("/api/auth/signin");
  }
  const teacher = await prisma.Teacher.findUnique({
    where: {
      userId: session.user.id,
    },
  });
  if (!teacher) {
    return redirect("/");
  }
  try {
    booked_classes = await prisma.OneToOneClass.findMany({
      where: {
        teacherId: teacher.id,
        endTime: {
          gte: new Date(),
        },
      },
      include: { student: true },
    });
    completed_classes = await prisma.OneToOneClass.findMany({
      where: {
        teacherId: teacher.id,
        status: "COMPLETED"
      },
      include: { student: true },
    });
    expired_not_completed_classes = await prisma.OneToOneClass.findMany({
      where: {
        teacherId: teacher.id,
        status: { in: ["REQUESTED", "CONFIRMED"] },
        endTime: {
          lte: new Date(),
        },
      },
      include: { student: true },
    });
  } catch (error) {
    console.error("Error fetching unbooked classes:", error);
    return [[], [], []];
  }
  return [booked_classes, completed_classes, expired_not_completed_classes];
}

async function page() {
  const [booked_classes, completed_classes, expired_not_completed_classes] = await fetchUnbookedClasses();

  // if (!booked_classes && !expired_classes) {
  //     return <div>..........loading</div>
  // }
  return (
    <div>
      <AllBookedClasses
        booked_classes={booked_classes}
        completed_classes={completed_classes}
        expired_not_completed_classes={expired_not_completed_classes}
      />
    </div>
  );
}

export default page;
