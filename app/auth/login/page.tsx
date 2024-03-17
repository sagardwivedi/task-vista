import { LoginForm } from "@/components/form/Auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { checkForLogin } from "../utils";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function Login() {
  const isLogin = await checkForLogin();

  if (isLogin) {
    redirect("/board");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-[90%] max-w-md">
        <h1 className="mb-5 text-center text-2xl font-semibold">
          Welcome Back
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
