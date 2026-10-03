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
    console.error("Error fetching booked classes:", error);
    return null;
  }
  return booked_classes;
}

export async function getAllUnbookedClasses() {
  const teacher = await getTeacherInfo();
  if (!teacher || !Array.isArray(teacher.subjects) || teacher.subjects.length === 0) {
    return [];
  }

  // Safely flatten / parse in case legacy data contains JSON-encoded strings
  const teacher_subjects = teacher.subjects
    .flatMap((s) => {
      if (!s) return [];
      if (typeof s === "string") {
        try {
          const parsed = JSON.parse(s);
          return Array.isArray(parsed) ? parsed : [s];
        } catch {
          return [s];
        }
      }
      return [s];
    })
    .map((subject) => String(subject).trim().toLowerCase())
    .filter(Boolean);

  if (teacher_subjects.length === 0) {
    return [];
  }

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
    console.error("Error fetching unbooked classes:", error);
    return [];
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
    console.error("Error fetching completed classes:", error);
    return null;
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
    console.error("Error fetching expired uncompleted classes:", error);
    return null;
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
  }

  return null;
}
