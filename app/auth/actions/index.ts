'use server';

import { loginFormType } from '@/components/Form/Login';
import { signupFormType } from '@/components/Form/SignUp';
import { createSerClient } from '@/lib/utils/supabase/server';

export async function signup(data: signupFormType) {
    const supabase = createSerClient();

    const result = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
    });

    return JSON.stringify(result);
}

export async function signin(data: loginFormType) {
    const supabase = createSerClient();

    const result = await supabase.auth.signInWithPassword(data);

    return JSON.stringify(result);
}
