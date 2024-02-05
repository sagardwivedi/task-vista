import { SidebarIcon } from 'lucide-react';

import { fetchBoards } from '@/lib/actions';
import { ActiveLink } from '../ui/ActiveLink';
import { Each } from '../ui/Each';
import { NewBoardModal } from './NewBoardModal';

export async function Sidebar() {
  const { data } = await fetchBoards();

  return (
    <div className="h-full w-[18rem] border-r px-2 max-md:hidden">
      <div className="flex h-20 items-center justify-center">
        <p className="text-2xl font-semibold">Task Vista</p>
      </div>
      <div>
        <h2 className="mb-2 px-5">ALL BOARDS ({data?.length})</h2>
        <Each
          of={data!}
          render={(board) => (
            <ActiveLink key={board.id} href={`/board/${board.id}`}>
              <SidebarIcon />
              <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                {board.name}
              </p>
            </ActiveLink>
          )}
        />
        <NewBoardModal />
      </div>
    </div>
  );
}
