import { auth } from "@/auth";
import prisma from "../prisma";

export async function getTeacherInfo() {
  const session = await auth();
  if (!session) {
    return null;
  }
  let teacher = null;
  try {
    teacher = await prisma.Teacher.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        user: true,
      },
    });
    if (teacher) {
      return teacher;
    }
  } catch {
    return null;
  } finally {
    await prisma.$disconnect();
  }
  return null;
}

export async function getAllBookedClasses() {
  const teacher = await getTeacherInfo();
  if (!teacher) {
    return null;
  }
  let booked_classes = [];
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
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
  return booked_classes;
}

export async function getAllUnbookedClasses() {
  const teacher = await getTeacherInfo();
  console.log(teacher);
  if (!teacher) {
    return null;
  }
  const teacher_subjects = teacher.subjects[0]
    .split(",")
    .map((subject) => subject.trim().toLowerCase());
  console.log(teacher_subjects);
  let unbooked_classes = [];
  try {
    unbooked_classes = await prisma.OneToOneClass.findMany({
      where: {
        teacherId: null,

        Booked: false,
        subject: {
          in: teacher_subjects,
        },
      },
      include: { student: true, teacher: true },
    });
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
  return unbooked_classes;
}

export async function getAllCompletedClasses() {
  const teacher = await getTeacherInfo();
  if (!teacher) {
    return null;
  }
  let completedClasses = [];
  try {
    completedClasses = await prisma.OneToOneClass.findMany({
      where: {
        teacherId: teacher.id,
        completed: true,
      },
      include: { student: true },
    });
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
  return completedClasses;
}
export async function getAllUnCompletedExpiredClasses() {
  const teacher = await getTeacherInfo();
  if (!teacher) {
    return null;
  }
  let expired_not_completed_classes = [];
  try {
    expired_not_completed_classes = await prisma.OneToOneClass.findMany({
      where: {
        teacherId: teacher.id,
        completed: false,
        endTime: {
          lte: new Date(),
        },
      },
      include: { student: true },
    });
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
  return expired_not_completed_classes;
}

export async function checkUserApplication() {
  const session = await auth();
  if (!session) {
    return null;
  }
  let teacherApplication = null;
  try {
    teacherApplication = await prisma.Teacher.findUnique({
      where: {
        userId: session.user.id,
      },
      include: {
        user: true,
      },
    });
    if (teacherApplication) {
      return teacherApplication;
    }
  } catch {
    return null;
  } finally {
    await prisma.$disconnect();
  }

  return null;
}
