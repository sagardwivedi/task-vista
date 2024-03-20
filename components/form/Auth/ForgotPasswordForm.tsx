"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { sendPasswordResetLink } from "@/lib/actions/authAction";
import { loginUserSchema } from "@/lib/schema/user-schema";
import type { z } from "zod";
import { useToast } from "../../ui/use-toast";
import { EmailInput } from "@/components/shared/form-inputs";
import { AuthFormButton } from "@/components/shared/button";

const formSchema = loginUserSchema.omit({ password: true });

type formSchemaType = z.infer<typeof formSchema>;

export default function ForgotPassword() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();

  const handleSubmit: SubmitHandler<formSchemaType> = async (info) => {
    const error = await sendPasswordResetLink(info.email);
    if (!error) {
      form.reset();
      toast({ description: "Please check your email" });
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
        <EmailInput control={form.control} name="email" />
        <AuthFormButton isSubmitting={form.formState.isSubmitting} />
        <Link href={"login"} className="block text-center text-green-500">
          Back to Log in
        </Link>
      </form>
    </Form>
  );
}
