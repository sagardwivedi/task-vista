import { readUserSession } from '@/lib/actions';
import { redirect } from 'next/navigation';

export default async function KanbanBoard() {
    const { data } = await readUserSession();
    
    if (!data.session) {
        return redirect('/');
    }

    return <div>Hello</div>;
}
