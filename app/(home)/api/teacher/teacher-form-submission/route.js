import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req, res) {
  const session = await auth();
  if (!session) {
    return NextResponse.unauthorized("Unauthorized");
  }
  const existingTeacher = await prisma.Teacher.findUnique({
    where: {
      userId: session.user.id,
    },
  });
  if (existingTeacher) {
    return NextResponse.json({
      message: "You have already submitted a teacher application",
      data: existingTeacher,
      status: 400,
    });
  }
  const { name } = session.user;

  const Formdata = await req.formData();
  const resume = Formdata.get("resume");
  const education = Formdata.get("education");
  const contact = Formdata.get("contact");
  const subjects = Formdata.getAll("subjects");
  const experience = Formdata.get("experience");
  // const subjects = allsubjects.split(',');

  try {
    const teacher = await prisma.Teacher.create({
      data: {
        name: name,
        resume: "",
        experience: experience,
        contact: contact,
        subjects: subjects,
        education: education,
        userId: session.user.id,
        verified: false,
      },
    });
    return NextResponse.json({
      message: " submitted successfully",
      data: teacher,
      status: 201,
    });
  } catch (error) {
    return NextResponse.internalServerError("Something went wrong");
  } finally {
    await prisma.$disconnect();
  }
}
