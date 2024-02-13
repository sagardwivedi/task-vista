'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { Database } from '../types/schema';

import { createClient as createServerClient } from '../utils/supabase/server';

export async function readUserSession() {
  noStore();
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);
  return await supabase.auth.getSession();
}

export async function readUserId() {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);
  return (await supabase.auth.getSession()).data.session?.user.id!;
}

export async function fetchBoards() {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(cookieStore);

  let { data: board } = await supabase.from('board').select('*');

  return { board };
}

export async function fetchBoard(id: number) {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(cookieStore);
  const { data } = await supabase
    .from('board')
    .select('name')
    .eq('id', id)
    .single();
  return { data };
}

export async function addBoard(name: string) {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(cookieStore);

  const user_id = await readUserId();

  const { error } = await supabase.from('board').insert({ name, user_id });

  revalidatePath('/board');
  return { error };
}
