import { SignUpForm } from '@/components/form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default async function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-[90%] max-w-md">
        <h1 className="mb-5 text-center text-2xl font-semibold">
          Create your account
        </h1>
        <SignUpForm />
      </div>
    </div>
  );
}
