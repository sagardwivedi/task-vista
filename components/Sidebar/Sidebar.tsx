import { SidebarIcon } from 'lucide-react';

import { fetchBoards } from '@/lib/actions';
import { ActiveLink } from '../ui/ActiveLink';
import { Each } from '../ui/Each';
import { ScrollArea } from '../ui/scroll-area';
import { NewBoardModal } from './NewBoardModal';

export async function Sidebar() {
  const { board } = await fetchBoards();

  return (
    <div className="h-full w-[18rem] border-r px-2 max-md:hidden">
      <NewBoardModal />
      <div>
        <h2 className="mb-2 px-5">ALL BOARDS ({board?.length})</h2>
        <ScrollArea className="h-[550px]">
          <Each
            of={board!}
            render={(board) => (
              <ActiveLink key={board.id} href={`/board/${board.id}`}>
                <SidebarIcon />
                <p className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  {board.name}
                </p>
              </ActiveLink>
            )}
          />
        </ScrollArea>
      </div>
    </div>
  );
}
