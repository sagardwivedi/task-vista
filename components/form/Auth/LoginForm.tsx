"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { login } from "@/lib/actions/authAction";
import { type LoginUserInput, loginUserSchema } from "@/lib/schema/user-schema";
import { useToast } from "../../ui/use-toast";
import { AuthFormButton } from "../shared/button";
import { EmailInput, PasswordInput } from "../shared/form-inputs";

export default function LoginForm() {
  const form = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const { push } = useRouter();

  const handleSubmit: SubmitHandler<LoginUserInput> = async (info) => {
    const error = await login(info);
    if (!error) {
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
        <EmailInput control={form.control} name={"email"} />
        <PasswordInput control={form.control} name={"password"} />
        <div className="text-sm text-green-500 underline-offset-2 hover:underline">
          <Link href={"forgot-password"}>Forgot Password?</Link>
        </div>
        <AuthFormButton isSubmitting={form.formState.isSubmitting} />
        <div className="flex flex-row items-center justify-center">
          <p>Don&apos;t have an account?</p>
          <Button
            className="text-green-500"
            variant={"link"}
            size={"sm"}
            asChild
          >
            <Link href={"signup"}>Sign up</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
