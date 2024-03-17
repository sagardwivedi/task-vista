"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { sendPasswordResetLink } from "@/lib/actions/authAction";
import { useToast } from "../ui/use-toast";
import { AuthFormButton } from "./button";

const formSchema = z.object({
	email: z.string().email({ message: "Please provide valid email" }),
});

type formSchemaType = z.infer<typeof formSchema>;

export default function ForgotPassword() {
	const form = useForm<formSchemaType>({
		resolver: zodResolver(formSchema),
	});
	const { toast } = useToast();
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(async (data) => {
					const error = await sendPasswordResetLink({ email: data.email });
					if (error) {
						toast({ variant: "destructive", description: error });
						console.error(error);
					}
					toast({
						description: "Please check your email",
					});
					form.reset();
				})}
				className="space-y-5"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									autoFocus
									placeholder="sagar@gamil.con"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<AuthFormButton isSubmitting={form.formState.isSubmitting} />

				<Link href={"login"} className="block text-center text-green-500">
					Back to Log in
				</Link>
			</form>
		</Form>
	);
}
