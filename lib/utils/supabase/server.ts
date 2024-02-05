import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient<T>(cookieStore: ReturnType<typeof cookies>) {
  return createServerClient<T>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
}
