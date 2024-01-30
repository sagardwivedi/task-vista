import { notFound } from 'next/navigation';

import { getBoard } from '@/lib/action/data';
import { ShowSidebarButton } from '../Sidebar/buttons';

export async function Header({ id }: { id: string }) {
  const board = await getBoard(id);

  if (!board) {
    notFound();
  }

  return (
    <div className="flex h-12 items-center justify-center border-b px-4 md:h-20 md:px-8">
      <div className="flex w-full flex-row items-center justify-between">
        <ShowSidebarButton />

        <h1 className="text-2xl font-semibold">{board.name}</h1>

        <div>
          <button>New Task</button>
        </div>
      </div>
    </div>
  );
}
