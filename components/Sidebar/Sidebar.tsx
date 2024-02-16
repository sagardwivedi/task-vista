import { fetchBoards } from '@/lib/actions';
import { SidebarIcon } from 'lucide-react';
import { ActiveLink } from '../ui/ActiveLink';
import { Each } from '../ui/Each';
import { ScrollArea } from '../ui/scroll-area';
import { NewBoardModal } from './NewBoardModal';

export async function Sidebar() {
  const { board } = await fetchBoards();

  return (
    <div className="bg-secondary h-full w-[18rem] space-y-2 pl-4 pr-2 max-md:hidden">
      <div className="py-2">
        <NewBoardModal />
      </div>

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
  );
}
