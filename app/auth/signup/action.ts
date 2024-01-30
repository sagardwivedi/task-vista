'use server';

import { signupFormType } from '@/components/Form/SignUp';
import { createClient } from '@/lib/utils/supabase/actions';
import { cookies, headers } from 'next/headers';

export async function signup(data: signupFormType) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const getURL = () => {
        let url =
            process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
            process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
            'http://localhost:3000/';
        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`;
        // Make sure to include a trailing `/`.
        url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
        return url;
    };

    const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            emailRedirectTo: getURL(),
        },
    });

    if (error) {
        return { error: error.message };
    }

    return { message: 'Check your email' };
}
