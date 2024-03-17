"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signup } from "@/lib/actions/authAction";
import {
  type CreateUserInput,
  createUserSchema,
} from "@/lib/schema/user-schema";
import { useToast } from "../../ui/use-toast";
import { AuthFormButton } from "../shared/button";
import { EmailInput, PasswordInput } from "../shared/form-inputs";

export default function SignUpForm() {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      passwordConfirm: "",
      email: "",
      password: "",
    },
  });
  const { toast } = useToast();

  const handleSubmit: SubmitHandler<CreateUserInput> = async (info) => {
    const error = await signup(info);
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
        <PasswordInput control={form.control} name="password" />
        <PasswordInput
          control={form.control}
          name="passwordConfirm"
          label="Retype Password"
        />
        <AuthFormButton isSubmitting={form.formState.isSubmitting} />
        <div className="flex flex-row items-center justify-center">
          <p>Already have an account?</p>
          <Button
            className="text-green-500"
            variant={"link"}
            size={"sm"}
            asChild
          >
            <Link href={"login"}>Log in</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
