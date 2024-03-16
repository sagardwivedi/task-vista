'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { signup } from '@/lib/actions/authAction';
import { LoaderCircleIcon } from 'lucide-react';
import { useToast } from '../ui/use-toast';

const formSchema = z
  .object({
    email: z.string().email({ message: 'Please provide valid email' }),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Your password doesn't match",
  });

type signUpFormType = z.infer<typeof formSchema>;

export default function SignUpForm() {
  const form = useForm<signUpFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: '',
      email: '',
      password: '',
    },
  });
  const { toast } = useToast();

  // Store form state
  const isSubmitting = form.formState.isSubmitting;

  const handleFormSubmit: SubmitHandler<
    Omit<signUpFormType, 'confirmPassword'>
  > = async (info) => {
    try {
      const error = await signup(info);
      if (!error) {
        toast({
          description: 'Please check your email',
        });
      }
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Retype Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} className="w-full" size={'lg'}>
          {isSubmitting ? (
            <LoaderCircleIcon className="animate-spin text-2xl" />
          ) : (
            'Continue'
          )}
        </Button>
        <div className="flex flex-row items-center justify-center">
          <p>Already have an account?</p>
          <Button
            className="text-green-500"
            variant={'link'}
            size={'sm'}
            asChild
          >
            <Link href={'login'}>Log in</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
