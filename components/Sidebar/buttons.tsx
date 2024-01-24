'use client';

import { useBoard } from '@/lib/hooks/useBoard';
import { useSidebar } from '@/lib/hooks/useSidebar';
import { MenuIcon, PlusIcon } from 'lucide-react';

export function NewBoardButton() {
  const { setOpen } = useBoard();

  return (
    <button onClick={setOpen} className="flex items-center gap-2 px-4 py-3">
      <PlusIcon />
      <p>Create New Board</p>
    </button>
  );
}

export function ShowSidebarButton() {
  const { setOpen } = useSidebar();
  return (
    <div onClick={setOpen} className="md:hidden">
      <MenuIcon />
    </div>
  );
}
