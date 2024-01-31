'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

import { createClient } from '../utils/supabase/actions';

export async function readUserSession() {
    noStore();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    return await supabase.auth.getSession();
}
