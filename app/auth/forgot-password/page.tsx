import { ForgotPasswordForm } from "@/components/form/Auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default async function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-[90%] max-w-md">
        <h1 className="mb-5 text-center text-2xl font-semibold">
          Reset your password
        </h1>
        <p className="text-center">
          Enter your email address and we will send you instructions to reset
          your password.
        </p>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
