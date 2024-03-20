"use server";

import createSupabaseServerClient from "@/lib/supabase/server";
import { LoginUserInput } from "../schema/user-schema";

export async function login(formData: LoginUserInput) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return error.message;
  }
}

export async function signup(formData: LoginUserInput) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    return error.message;
  }
}

export async function sendPasswordResetLink(email: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return error.message;
  }
}

export async function resetPassword(password: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return error.message;
  }
}
