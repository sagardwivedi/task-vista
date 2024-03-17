import { ResetPasswordForm } from "@/components/form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Reset Password",
};

export default async function Password() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-[90%] max-w-md">
				<h1 className="mb-5 text-center text-2xl font-semibold">
					Add new passord
				</h1>
				<ResetPasswordForm />
			</div>
		</div>
	);
}
