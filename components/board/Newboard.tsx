"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PenIcon } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";

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

export function NewBoard() {
  const form = useForm<BoardInput>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit: SubmitHandler<BoardInput> = (data) => {
    console.log(data);
  };

  return (
    <Sheet modal={true}>
      <SheetTrigger asChild>
        <div className="flex flex-row items-center hover:bg-slate-200 rounded-md p-3 cursor-pointer w-full justify-between">
          <p>TK</p>
          <PenIcon />
        </div>
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
