import { ProfileInput } from "../schema/user-schema";
import createSupabaseServerClient from "../supabase/server";

export async function profile(formData: ProfileInput) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("profile")
    .insert({ full_name: formData.name });

  if (error) {
    return error.message;
  }
}
