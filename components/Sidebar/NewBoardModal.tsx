'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

const formSchema = z.object({
  name: z.string().min(1),
});

type formType = z.infer<typeof formSchema>;

export function NewBoardModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<formType>({ defaultValues: { name: '' } });

  async function onSubmit(data: formType) {
    alert(JSON.stringify(data, null, 2));
  }

  function onChange() {
    setOpen(true);
  }

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={'ghost'}
          size={'lg'}
          className="mt-2 w-full"
        >
          <PlusIcon className="mr-2 size-4" />
          Create New Board
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">New Board</DialogTitle>
          <DialogDescription>
            Please provide the board name for your task to ensure proper
            categorization and organization.
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-2 w-full" size={'lg'}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
