import AllUnbookedClasses from "@/components/teacher/all-unbooked-classes";
import { getAllUnbookedClasses } from "@/lib/teacher/teacher-info";

async function page() {
  const unbooked_classes = await getAllUnbookedClasses();
  console.log(unbooked_classes);
  if (!unbooked_classes) {
    return <div>..........loading</div>;
  }
  return (
    <div>
      {unbooked_classes.length > 0 ? (
        <AllUnbookedClasses unbooked_classes={unbooked_classes} />
      ) : (
        <div>No classes available</div>
      )}
    </div>
  );
}

export default page;
