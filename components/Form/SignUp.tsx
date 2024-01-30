'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { infer as InferType, object, string } from 'zod';

import { signup } from '@/app/auth/signup/action';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { PasswordRules } from './PasswordRules';

const signpForm = object({
    email: string().email({ message: 'Enter valid email' }),
    password: string().min(8, { message: 'Please enter 8 characters.' }),
    confirm: string(),
}).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
});

export type signupFormType = InferType<typeof signpForm>;

export function SignUpForm() {
    const form = useForm<signupFormType>({
        resolver: zodResolver(signpForm),
        defaultValues: {
            email: '',
            password: '',
            confirm: '',
        },
    });

    async function onSubmit(values: signupFormType) {
        const { message, error } = await signup(values);
        if (message) {
            toast.success(message);
        }
        if (error) {
            toast.error(error);
        }
        form.reset();
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
                            <PasswordRules />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Retype Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="********"
                                    {...field}
                                />
                            </FormControl>
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
                    Sign Up
                </Button>
                <p className="text-center">
                    Already have an account?{' '}
                    <Link
                        className="text-blue-500 hover:underline"
                        href={'login'}
                    >
                        Log In
                    </Link>
                </p>
            </form>
        </Form>
    );
}
