import { LoginForm } from '@/components/Form/Login';
import { readUserSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function Login() {
    const { data } = await readUserSession();

    if (data.session) {
        return redirect('/board');
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-[90%] max-w-md">
                <h1 className="mb-5 text-center text-2xl font-semibold">
                    Task Vista | Sign In
                </h1>
                <LoginForm />
            </div>
        </div>
    );
}
