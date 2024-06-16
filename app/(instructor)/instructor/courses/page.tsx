import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function CoursesPage() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="px-6 py-4">
      <Link href={"/instructor/create-courses"}>
        <Button>Create New Courses</Button>
      </Link>
    </div>
  );
}
