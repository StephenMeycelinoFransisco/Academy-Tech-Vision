const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    const categories = [
      {
        name: "IT & Software",
        subCategories: {
          create: [
            { name: "Web Development" },
            { name: "Data Science" },
            { name: "Cybersecurity" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Business",
        subCategories: {
          create: [
            { name: "E-Commerce" },
            { name: "Marketing" },
            { name: "Finance" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Design",
        subCategories: {
          create: [
            { name: "Graphic Design" },
            { name: "3D & Animation" },
            { name: "Interior Design" },
            { name: "Others" },
          ],
        },
      },
      {
        name: "Health",
        subCategories: {
          create: [
            { name: "Fitness" },
            { name: "Yoga" },
            { name: "Nutrition" },
            { name: "Others" },
          ],
        },
      },
    ];

    for (const category of categories) {
      const existingCategory = await database.category.findUnique({
        where: { name: category.name },
      });

      if (!existingCategory) {
        await database.category.create({
          data: {
            name: category.name,
            subCategories: category.subCategories,
          },
          include: {
            subCategories: true,
          },
        });
      } else {
        console.log(`Category "${category.name}" already exists`);
      }
    }

    const levels = [
      { name: "Beginner" },
      { name: "Intermediate" },
      { name: "Expert" },
      { name: "All levels" },
    ];

    for (const level of levels) {
      const existingLevel = await database.level.findUnique({
        where: { name: level.name },
      });

      if (!existingLevel) {
        await database.level.create({
          data: { name: level.name },
        });
      } else {
        console.log(`Level "${level.name}" already exists`);
      }
    }

    console.log("Seeding successfully");
  } catch (error) {
    console.log("Seeding failed", error);
  } finally {
    await database.$disconnect();
  }
}

main();
