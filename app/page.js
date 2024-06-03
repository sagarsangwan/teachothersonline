import checkIsTeacherOrNot from "@/components/teacher/teacher-application-check";
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Teacher Application</h1>
      {checkIsTeacherOrNot()}

    </main>
  );
}
