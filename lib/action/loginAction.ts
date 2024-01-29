'use server';

import { cookies } from 'next/headers';
import { createClient } from '../utils/supabase/action';

export async function login(formdata: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
}

export async function signup(formdata: FormData) {}
