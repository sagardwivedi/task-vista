'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { infer as InferType, object, string } from 'zod';

import { signup } from '@/app/auth/actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/utils';
import { useTransition } from 'react';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { PasswordRules } from './PasswordRules';

const signpForm = object({
  email: string().email(),
  password: string().min(1, {
    message: 'Password is required.',
  }),
  confirm: string().min(1, {
    message: 'Password is required.',
  }),
}).refine((data) => data.confirm === data.password, {
  message: 'Password did not match',
  path: ['confirm'],
});

export type signupFormType = InferType<typeof signpForm>;

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<signupFormType>({
    resolver: zodResolver(signpForm),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
    },
  });

  async function onSubmit(values: signupFormType) {
    startTransition(async () => {
      const result = await signup(values);
      const { error } = JSON.parse(result);

      if (error?.message) {
        toast({
          variant: 'destructive',
          title: 'You submitted the following value: ',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-neutral-950 p-4">
              <code className="text-white">{error.message}</code>
            </pre>
          ),
        });
      } else {
        toast({
          title: 'You are successfully register.',
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-neutral-950 p-4">
              <code className="text-white">register complete</code>
            </pre>
          ),
        });
      }
    });
    form.reset();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
                  {...field}
                  type="password"
                  onChange={field.onChange}
                  placeholder="********"
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
                  placeholder="********"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>
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
          Sign Up
        </Button>
        <p className="text-center">
          Already have an account?{' '}
          <Link className="text-blue-500 hover:underline" href={'login'}>
            Log In
          </Link>
        </p>
      </form>
    </Form>
  );
}
