'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ActiveLink({
  children,
  href,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const path = usePathname();
  const isActive = href === path;

  return (
    <Link
      className={`inline-flex w-full items-center gap-2 rounded-md px-4 py-3 transition-colors duration-100 ease-linear ${isActive ? 'bg-gray-500 text-white' : 'hover:bg-gray-500/50 hover:text-gray-800'}`}
      href={href}
    >
      {children}
    </Link>
  );
}
