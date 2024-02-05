import { redirect } from 'next/navigation';

import { SignUpForm } from '@/components/Form/SignUp';
import { readUserSession } from '@/lib/actions';

export default async function SignUp() {
  const { data } = await readUserSession();

  if (data.session) {
    return redirect('/welcome');
  }

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
