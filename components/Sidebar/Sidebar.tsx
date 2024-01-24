import { SidebarIcon } from 'lucide-react';
import { unstable_noStore } from 'next/cache';

import { getBoards } from '@/lib/action/data';
import { ActiveLink } from '../ui/ActiveLink';
import { Each } from '../ui/Each';
import { NewBoardButton } from './buttons';

export async function Sidebar() {
  unstable_noStore();
  const boards = await getBoards();

  return (
    <div className="h-full w-[18rem] border-r px-2 max-md:hidden">
      <div className="flex h-20 items-center justify-center">
        <p className="text-2xl font-semibold">Task Vista</p>
      </div>
      <div>
        <Each
          of={boards}
          render={(board, index) => (
            <ActiveLink key={index} href={board.id.toString()}>
              <SidebarIcon />
              <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {board.name}
              </p>
            </ActiveLink>
          )}
        />
        <NewBoardButton />
      </div>
    </div>
  );
}
