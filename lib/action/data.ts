interface Board {
  id: number;
  name: string;
}

const URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
  : 'http://localhost:3000/api';

export async function getBoards(): Promise<Array<Board>> {
  const response = await fetch(`${URL}/boards`, { method: 'GET' });
  const boards = await response.json();
  return boards;
}

export async function getBoard(board_id: string): Promise<Board | null> {
  const response = await fetch(`${URL}/boards/${Number(board_id)}`, {
    method: 'GET',
  });
  if (response.status === 404) {
    return null;
  }
  const board = await response.json();
  return board;
}
