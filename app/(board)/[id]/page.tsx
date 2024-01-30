import { Header } from '@/components/kanban/Header';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <Header id={params.id} />
      {params.id}
    </div>
  );
}
