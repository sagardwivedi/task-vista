import createSupabaseServerClient from "@/lib/supabase/server";

export async function checkForLogin() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  return !!data.user;
}

export async function getUserId() {
  const supabase = await createSupabaseServerClient();
  return (await supabase.auth.getUser()).data.user?.id;
}
