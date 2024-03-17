'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { AuthFormType } from '@/components/form';
import createSupabaseServerClient from '@/lib/supabase/server';

export async function login(formData: AuthFormType) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/board');
}

export async function signup(formData: AuthFormType) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    return error.message;
  }
}

export async function sendPasswordResetLink({ email }: { email: string }) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return error.message;
  }
}

export async function resetPassword({ password }: { password: string }) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return error.message;
  }

  redirect('login');
}
