function BoardLink() {
  return <div className="bg-gray-400 animate-pulse p-5 rounded-md"></div>;
}

export function BoardLinkSkeleton() {
  return (
    <div className="space-y-4">
      <BoardLink />
      <BoardLink />
      <BoardLink />
      <BoardLink />
    </div>
  );
}
