'use client';

import { NewBoardModal } from '@/components/Sidebar/NewBoardModal';
import { useEffect, useState } from 'react';

export function ModalProvider() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
  }, []);

  if (!load) {
    return null;
  }

  return (
    <>
      <NewBoardModal />
    </>
  );
}
