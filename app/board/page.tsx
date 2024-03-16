import { redirect } from 'next/navigation';
import { checkForLogin } from '../auth/utils';

export default async function KanbanBoard() {
  const isLogin = await checkForLogin();

  if (!isLogin) {
    redirect('/auth/login');
  }

  return <div>Hello</div>;
}
