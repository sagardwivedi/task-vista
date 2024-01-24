import { useBoard } from '@/lib/hooks/useBoard';
import { Modal } from '../ui/Modal';

export function NewBoardModal() {
  const { isOpen, setClose } = useBoard();

  return (
    <Modal title="New Board" isOpen={isOpen} setClose={setClose} side="center">
      Hello
    </Modal>
  );
}
