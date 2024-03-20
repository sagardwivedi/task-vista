"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PenIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { addBoard } from "@/lib/actions/dataAction";
import {
  profileSchema as boardSchema,
  type ProfileInput as BoardInput,
} from "@/lib/schema/user-schema";
import { AuthFormButton } from "../shared/button";
import { NameInput } from "../shared/form-inputs";
import { Form } from "../ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

export function NewBoard() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<BoardInput>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: "",
    },
  });

  const { toast } = useToast();

  const handleSubmit: SubmitHandler<BoardInput> = async (data) => {
    const { error } = await addBoard(data);
    if (error) {
      toast({ title: "Something went wrong", description: error.message });
    } else {
      form.reset();
      toast({
        title: "Success",
      });
      setIsOpen(false);
    }
  };

  return (
    <Sheet modal={true} onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          onClick={() => setIsOpen(true)}
          className="flex flex-row items-center hover:bg-slate-200 rounded-md p-4 cursor-pointer w-full justify-between"
        >
          <p>TK</p>
          <PenIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>New Board</SheetTitle>
          <SheetDescription>Add new board foe creating tasks.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <NameInput control={form.control} name="name" />
            <AuthFormButton isSubmitting={form.formState.isSubmitting} />
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
