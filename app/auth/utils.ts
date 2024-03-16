import { createClient } from '@/lib/utils/supabase/server';
import { cookies } from 'next/headers';

export async function checkForLogin() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.auth.getUser();
  return !!data.user;
}
