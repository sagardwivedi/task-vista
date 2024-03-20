import { getBoard } from "@/lib/actions/dataAction";
import { SidebarIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { BoardLinkSkeleton } from "../skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { NewBoard } from "./Newboard";
import { ModeToggle } from "../mode-toggle";
import { Avatar } from "../ui/avatar";

export function Sidebar() {
  return (
    <div className="bg-slate-50 p-2 dark:bg-slate-900 h-full">
      <NewBoard />
      <div className="mt-5 h-[550px]">
        <p className="mb-2">ALL BOARDS</p>
        <Suspense fallback={<BoardLinkSkeleton />}>
          <ScrollArea>
            <BoardLink />
          </ScrollArea>
        </Suspense>
      </div>
      <ModeToggle />
      <div className="w-full p-3">
        <Avatar></Avatar>
        <p></p>
      </div>
    </div>
  );
}

async function BoardLink() {
  const { data, error } = await getBoard();

  if (error || data === null) {
    return (
      <div className="flex justify-center items-center">
        Something went wrong
      </div>
    );
  }

  return (
    <div>
      {data.map((d) => (
        <div key={d.id}>
          <Link
            className="p-3 rounded-md dark:hover:bg-slate-800 flex flex-row items-center gap-2 hover:bg-slate-300 w-full"
            href={`/board/${d.id}`}
          >
            <SidebarIcon />
            <p> {d.name}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
