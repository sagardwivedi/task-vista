import { Header } from '@/components/kanban/Header';
import { getBoards } from '@/lib/action/data';

export async function generateStaticParams() {
  const boards = await getBoards();

  return boards.map((board) => ({
    id: board.id.toString(),
  }));
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Header id={params.id} />
      {params.id}
    </div>
  );
}
