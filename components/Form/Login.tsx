'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { infer as InferType, object, string } from 'zod';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '../ui/button';
import { PasswordRules } from './PasswordRules';

const loginFormSchema = object({
    email: string().email(),
    password: string()
        .min(8, 'Password must be at least 8 characters.')
        .max(50, 'Password cannot exceed 50 characters.'),
});

export type loginFormType = InferType<typeof loginFormSchema>;

export function LoginForm() {
    const form = useForm<loginFormType>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function onSubmit(values: loginFormType) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="sagar@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription className="text-md text-right text-neutral-950 underline-offset-2 hover:underline">
                                <Link href={'/forgot-password'}>
                                    Forgot Password?
                                </Link>
                            </FormDescription>
                            <PasswordRules />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    size={'lg'}
                    type="submit"
                    className="w-full"
                    disabled={form.formState.isSubmitting}
                >
                    {form.formState.isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Log In
                </Button>
                <p className="text-center">
                    Don&apos;t have an account?{' '}
                    <Link
                        className="text-blue-500 hover:underline"
                        href={'signup'}
                    >
                        Sign Up
                    </Link>
                </p>
            </form>
        </Form>
    );
}
