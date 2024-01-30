import { SignUpForm } from '@/components/Form/SignUp';

export default function SignUp() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-[90%] max-w-md">
                <h1 className="mb-5 text-center text-2xl font-semibold">
                    Task Vista | Sign Up
                </h1>
                <SignUpForm />
            </div>
        </div>
    );
}
