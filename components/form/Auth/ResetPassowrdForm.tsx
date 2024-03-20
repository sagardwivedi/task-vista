"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { resetPassword } from "@/lib/actions/authAction";
import { useToast } from "../../ui/use-toast";
import { PasswordInput } from "@/components/shared/form-inputs";
import { AuthFormButton } from "@/components/shared/button";

const formSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    passwordConfirm: z
      .string({
        required_error: "Please confirm your password",
      })
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

type formSchemaType = z.infer<typeof formSchema>;

export default function ResetPasswordForm() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passwordConfirm: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const { push } = useRouter();

  const handleSubmit: SubmitHandler<formSchemaType> = async (info) => {
    const error = await resetPassword(info.password);
    if (!error) {
      toast({
        title: "Successfull",
        description: "Your password is reset",
      });
      form.reset();
      push("/auth/login");
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
        <PasswordInput control={form.control} name="password" />
        <PasswordInput
          control={form.control}
          name="passwordConfirm"
          label="Retype Password"
        />
        <AuthFormButton isSubmitting={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}
