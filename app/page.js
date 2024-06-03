import checkIsTeacherOrNot from "@/components/teacher/teacher-application-check";
export default async function Home() {
  return (
    <main className="flex  flex-col">
      {checkIsTeacherOrNot()}

    </main>
  );
}
