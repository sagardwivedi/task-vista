'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export function NewBoardModal() {
  const [open, setOpen] = useState(false);
  const form = useForm();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogTitle>New Board</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div>
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="board"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
