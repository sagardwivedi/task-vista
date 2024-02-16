import { Sidebar } from '@/components/Sidebar/Sidebar';
import { ThemeProvider } from '@/lib/providers/theme-provider';

export default function BoardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="flex min-h-screen flex-row">
        <section className="w-fit">
          <Sidebar />
        </section>
        <section className="flex-1">{children}</section>
      </main>
    </ThemeProvider>
  );
}
