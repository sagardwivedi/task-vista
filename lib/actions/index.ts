'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

import { Database } from '../types/schema';
import { createClient } from '../utils/supabase/actions';
import { createClient as createServerClient } from '../utils/supabase/server';

export async function readUserSession() {
  noStore();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  return await supabase.auth.getSession();
}

export async function fetchBoards() {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(cookieStore);
  const { data, count } = await supabase.from('board').select('*');
  return { data, count };
}
