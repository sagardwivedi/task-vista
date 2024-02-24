'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { infer as InferType, object, string } from 'zod';

import { signin } from '@/app/auth/actions';
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
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { PasswordRules } from './PasswordRules';

const loginFormSchema = object({
  email: string().email(),
  password: string().min(1, {
    message: 'Password is required.',
  }),
});

export type loginFormType = InferType<typeof loginFormSchema>;

export function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  function onSubmit(data: loginFormType) {
    form.reset();
    startTransition(async () => {
      const result = await signin(data);
      const { error } = JSON.parse(result);

      if (!error) {
        redirect('/board');
      }

      if (error?.message) {
        toast({
          variant: 'destructive',
          title: 'Fail to Login',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{error.message}</code>
            </pre>
          ),
        });
      }
    });
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
                  type="email"
                  onChange={field.onChange}
                  autoComplete="email"
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
                  placeholder="********"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormDescription className="text-md text-right text-neutral-950 underline-offset-2 hover:underline">
                <Link href={'/forgot-password'}>Forgot Password?</Link>
              </FormDescription>
              <PasswordRules />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex w-full gap-2"
          disabled={form.formState.isSubmitting}
        >
          <Loader2 className={cn(' animate-spin', { hidden: !isPending })} />
          Log In
        </Button>
        <p className="text-center">
          Don&apos;t have an account?{' '}
          <Link className="text-blue-500 hover:underline" href={'signup'}>
            Sign Up
          </Link>
        </p>
      </form>
    </Form>
  );
}
