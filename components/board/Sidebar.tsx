import { Suspense } from "react";
import { BoardLinkSkeleton } from "../skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { NewBoard } from "./Newboard";
import { getBoard } from "@/lib/actions/dataAction";
import Link from "next/link";
import { SidebarIcon } from "lucide-react";

export function Sidebar() {
  return (
    <div className="bg-slate-50 p-2 dark:bg-slate-950 h-full">
      <NewBoard />
      <div className="mt-5">
        <p className="mb-2">ALL BOARDS</p>
        <ScrollArea>
          <Suspense fallback={<BoardLinkSkeleton />}>
            <BoardLink />
          </Suspense>
        </ScrollArea>
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
    <div className="space-y-4">
      {data.map((d) => (
        <div key={d.id}>
          <Link
            className="p-3 rounded-md flex flex-row items-center gap-2 hover:bg-slate-300 w-full"
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
