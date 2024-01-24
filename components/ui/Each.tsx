export function Each<T>({
  of,
  render,
}: {
  of: T[];
  render: (item: T, index: number) => React.ReactNode;
}) {
  return <>{of.map((item, index) => render(item, index))}</>;
}
