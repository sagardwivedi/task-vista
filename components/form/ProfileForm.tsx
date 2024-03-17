"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { profileSchema, type ProfileInput } from "@/lib/schema/user-schema";
import { AuthFormButton } from "./shared/button";
import { FileInput, NameInput } from "./shared/form-inputs";

export default function ProfileForm() {
  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit: SubmitHandler<ProfileInput> = async (info) => {
    console.table(info);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FileInput control={form.control} name="profileImage" />
        <NameInput control={form.control} name={"name"} />
        <AuthFormButton isSubmitting={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}
