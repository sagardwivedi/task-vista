import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ModalProvider } from '@/lib/providers/ModalProvider';

export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-row">
      <ModalProvider />
      <section className="w-fit">
        <Sidebar />
      </section>
      <section className="flex-1">{children}</section>
    </main>
  );
}
