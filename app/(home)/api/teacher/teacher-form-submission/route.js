import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const existingTeacher = await prisma.teacher.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (existingTeacher) {
    return NextResponse.json(
      {
        message: "You have already submitted a teacher application",
        data: existingTeacher,
      },
      { status: 400 }
    );
  }

  const { name } = session.user;

  try {
    const formData = await request.formData();
    const resume = formData.get("resume"); // You’ll need to handle this if it's a file
    const education = formData.get("education");
    const contact = formData.get("contact");
    const experience = formData.get("experience");

    let subjects = [];
    const rawSubjects = formData.get("subjects");
    if (rawSubjects) {
      try {
        const parsed = JSON.parse(rawSubjects);
        subjects = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        subjects = formData.getAll("subjects");
      }
    } else {
      subjects = formData.getAll("subjects");
    }

    const normalizedSubjects = subjects
      .flatMap((s) => (typeof s === "string" ? s.split(",") : [s]))
      .map((s) => String(s).trim().toLowerCase())
      .filter(Boolean);

    const teacher = await prisma.teacher.create({
      data: {
        name: name,
        resume: "", // You’ll need to replace this with uploaded file URL/path
        experience,
        contact,
        subjects: normalizedSubjects,
        education,
        userId: session.user.id,
        verified: false,
      },
    });

    return NextResponse.json(
      {
        message: "Submitted successfully",
        data: teacher,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
