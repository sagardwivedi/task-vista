'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login } from '@/lib/actions/authAction';
import { LoaderCircleIcon } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please provide valid email' }),
  password: z.string().min(8, {
    message: `Password must contain at least 8 character(s)`,
  }),
});

export type formSchemaType = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const handleFormSubmit = async (info: formSchemaType) => {
    try {
      await login(info);
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
                <Input type="password" placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-sm text-green-500 underline-offset-2 hover:underline">
          <Link href={'forgot-password'}>Forgot Password?</Link>
        </div>
        <Button disabled={isSubmitting} className="w-full" size={'lg'}>
          {isSubmitting ? (
            <LoaderCircleIcon className="animate-spin text-2xl" />
          ) : (
            'Continue'
          )}
        </Button>
        <div className="flex flex-row items-center justify-center">
          <p>Don&apos;t have an account?</p>
          <Button
            className="text-green-500"
            variant={'link'}
            size={'sm'}
            asChild
          >
            <Link href={'signup'}>Sign up</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
