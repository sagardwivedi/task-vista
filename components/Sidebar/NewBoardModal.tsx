'use client';

import { Loader2, PenIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { addBoard } from '@/lib/actions';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { toast } from '../ui/use-toast';

const formSchema = z.object({
  name: z.string().min(1),
});

type formType = z.infer<typeof formSchema>;

export function NewBoardModal() {
  const [open, setOpen] = useState(false);
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '' },
  });

  async function onSubmit(data: formType) {
    const { error } = await addBoard(data.name);
    if (error) {
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
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-neutral-950 p-4">
            <code className="text-white">Board Added</code>
          </pre>
        ),
      });
      form.reset();
      setOpen(!open);
    }
  }

  const onOpenChangeHandler = () => {
    const isDirty = form.formState.isDirty;

    if (
      open &&
      isDirty &&
      !window.confirm('Do you want to continue or discard')
    ) {
      // If the form is open, has changes, and user cancels, do nothing
      return;
    }

    // If the form is closed or user confirmed, toggle the 'open' state
    setOpen(!open);

    if (open && isDirty) {
      // If the form is open and has changes, reset the form
      form.reset(); // Replace this with your form reset logic
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={'ghost'}
          className="my-2 flex w-full flex-row items-center justify-between px-3 py-2"
        >
          <div className="inline-flex size-8 items-center justify-center rounded-full bg-black text-white">
            TK
          </div>
          <PenIcon />
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
              <Button
                disabled={form.formState.isSubmitting}
                className="mt-2 w-full"
                size={'lg'}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  'Submit'
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
