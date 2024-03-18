"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { profile } from "@/lib/actions/profileAction";
import { profileSchema, type ProfileInput } from "@/lib/schema/user-schema";
import { AuthFormButton } from "../shared/button";
import { NameInput } from "../shared/form-inputs";
import { useToast } from "../ui/use-toast";

export default function ProfileForm() {
  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
    },
  });

  const { push } = useRouter();
  const { toast } = useToast();

  const handleSubmit: SubmitHandler<ProfileInput> = async (info) => {
    const error = await profile(info);

    if (error) {
      form.reset();
      push("/board");
    } else {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <NameInput control={form.control} name={"name"} />
        <AuthFormButton
          text="Complete"
          isSubmitting={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
