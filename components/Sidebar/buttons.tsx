'use client';

import { useSidebar } from '@/lib/hooks/useSidebar';
import { MenuIcon } from 'lucide-react';

export function ShowSidebarButton() {
  const { setOpen } = useSidebar();
  return (
    <div onClick={setOpen} className="md:hidden">
      <MenuIcon />
    </div>
  );
}
