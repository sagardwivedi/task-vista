"use client";

import { LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserDropDown({ name }: { name?: string | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-full p-4 flex flex-row items-center gap-2 dark:hover:bg-slate-800 rounded-md dark:shadow">
          <Avatar className="size-6">
            <AvatarImage src="avatar" />
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
          <p>{name}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
