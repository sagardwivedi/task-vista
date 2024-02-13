'use server';

import { loginFormType } from '@/components/Form/Login';
import { signupFormType } from '@/components/Form/SignUp';
import { createClient } from '@/lib/utils/supabase/actions';

export async function signup(data: signupFormType) {
  const supabase = createClient();

  const result = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  return JSON.stringify(result);
}

export async function signin(data: loginFormType) {
  const supabase = createClient();

  const result = await supabase.auth.signInWithPassword(data);

  return JSON.stringify(result);
}
