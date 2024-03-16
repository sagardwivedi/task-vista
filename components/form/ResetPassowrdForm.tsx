'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { resetPassword } from '@/lib/actions/authAction';
import { useToast } from '../ui/use-toast';
import { AuthFormButton } from './button';

const formSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Your password doesn't match",
  });

type signUpFormType = z.infer<typeof formSchema>;

export default function ResetPasswordForm() {
  const form = useForm<signUpFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
  });
  const { toast } = useToast();

  const handleFormSubmit: SubmitHandler<
    Omit<signUpFormType, 'confirmPassword'>
  > = async (info) => {
    const error = await resetPassword(info);
    if (!error) {
      toast({
        description: 'Please check your email',
      });
    }
    toast({ variant: 'destructive', description: error });
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-5"
      >
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
        <AuthFormButton isSubmitting={form.formState.isSubmitting} />
      </form>
    </Form>
  );
}
