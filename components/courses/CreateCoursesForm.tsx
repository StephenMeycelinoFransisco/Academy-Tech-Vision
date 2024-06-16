"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ComboBox } from "../custom/ComboBox";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required and minimum 2 characters",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  subCategoryId: z.string().min(1, {
    message: "Subcategory is required",
  }),
});

interface CreateCoursesFormProps {
  categories: {
    label: string;
    value: string;
    subCategories: {
      label: string;
      value: string;
    }[];
  }[];
}

export default function CreateCoursesForm({
  categories,
}: CreateCoursesFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      subCategoryId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/instructor/courses/${response.data.id}/basic`);
      toast.success("Course created successfully");
    } catch (error) {
      console.log("Failed to Create New Courses", error);
      toast.error("Failed to Create New Courses");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-xl font-bold">
        Let give some basics for your course
      </h1>
      <p className="text-sm mt-3">
        It is ok if you cannot think of a good title or correct category now.
        You can change them later.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-10"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Web Development for Beginners"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <ComboBox options={categories} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subCategoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>SubCategory</FormLabel>
                <FormControl>
                  <ComboBox
                    options={
                      categories.find(
                        (category) =>
                          category.value === form.watch("categoryId")
                      )?.subCategories || []
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
