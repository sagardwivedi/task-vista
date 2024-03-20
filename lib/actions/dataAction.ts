"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function getBoard() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("board").select("id, name");
  return { data, error };
}
