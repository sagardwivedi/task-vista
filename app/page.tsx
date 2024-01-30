import { LoginForm } from '@/components/Form/Login';

export default function Home() {
  return (
    <div className='flex justify-center min-h-screen items-center'>
      <div className='w-[90%] max-w-md'>
        <LoginForm />
      </div>
    </div>
  );
}
