import { fetchBoard } from '@/lib/actions';
import { notFound } from 'next/navigation';

export async function Header({ id }: { id: string }) {
  const { data } = await fetchBoard(Number(id));

  if (!data) {
    notFound();
  }

  return (
    <div className="flex h-12 items-center justify-center px-4 md:h-20 md:px-8">
      <div className="flex w-full flex-row items-center justify-between">
        <h1 className="text-2xl font-semibold">{data.name}</h1>
        <div>
          <button type='button'>New Task</button>
        </div>
      </div>
    </div>
  );
}
