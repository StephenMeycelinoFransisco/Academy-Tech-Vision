import CreateCoursesForm from "@/components/courses/CreateCoursesForm";
import { db } from "@/lib/db";

export default async function CreateCoursesPage() {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: true,
    },
  });

  return (
    <div>
      <CreateCoursesForm
        categories={categories.map((category) => ({
          label: category.name,
          value: category.id,
          subCategories: category.subCategories.map((subCategory) => ({
            label: subCategory.name,
            value: subCategory.id,
          })),
        }))}
      />
    </div>
  );
}
