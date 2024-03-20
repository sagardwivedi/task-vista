import { redirect } from "next/navigation";

import { ProfileForm } from "@/components/form";
import type { Metadata } from "next";
import { checkForLogin } from "../auth/utils";

export const metadata: Metadata = {
  title: "Welcome",
};

export default async function Login() {
  const isLogin = await checkForLogin();

  if (!isLogin) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-[90%] max-w-md">
        <h1 className="mb-5 text-center text-2xl font-semibold">
          Complete Your Profile
        </h1>
        <ProfileForm />
      </div>
    </div>
  );
}
