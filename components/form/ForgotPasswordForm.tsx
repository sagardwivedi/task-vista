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

const formSchema = z.object({
  email: z.string().email({ message: 'Please provide valid email' }),
});

type formSchemaType = z.infer<typeof formSchema>;

export default function ForgotPassword() {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  return (
    <Form {...form}>
      <form className="space-y-5">
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

        <Button className="w-full" size={'lg'}>
          Continue
        </Button>

        <Link href={'login'} className="block text-center text-green-500">
          Back to Log in
        </Link>
      </form>
    </Form>
  );
}
