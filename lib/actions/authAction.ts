'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AuthFormType } from '@/components/form';
import { createClient } from '@/lib/utils/supabase/server';

export async function login(formData: AuthFormType) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/board');
}

export async function signup(formData: AuthFormType) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    return error.message;
  }
}

export async function sendPasswordResetLink({ email }: { email: string }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return error.message;
  }
}

export async function resetPassword({ password }: { password: string }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return error.message;
  }

  redirect('login');
}