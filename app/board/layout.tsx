import { Sidebar } from "@/components/board";
import { ThemeProvider } from "@/components/theme-provider";

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
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="flex-none max-md:hidden w-[18rem]">
          <Sidebar />
        </div>
        <div className="flex-grow md:overflow-y-auto">{children}</div>
      </div>
    </ThemeProvider>
  );
}
