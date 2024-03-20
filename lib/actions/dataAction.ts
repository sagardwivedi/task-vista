"use server";

import { getUserId } from "@/app/auth/utils";
import { type ProfileInput as BoardInput } from "@/lib/schema/user-schema";
import createSupabaseServerClient from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getBoard() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("board").select("id, name");
  return { data, error };
}

export async function getUserInfo() {
  const supabase = await createSupabaseServerClient();
  const user_id = await getUserId();
  const { data } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user_id || "")
    .single();
  return data;
}

export async function addBoard(data: BoardInput) {
  const supabase = await createSupabaseServerClient();
  const user_id = await getUserId();
  const { error } = await supabase.from("board").insert({ ...data, user_id });
  if (!error) {
    revalidatePath("/board");
  }
  return { error };
}
