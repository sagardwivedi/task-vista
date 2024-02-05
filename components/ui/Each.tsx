/**
 * Interface for the props of the Each component.
 *
 * @template T - The type of items in the array.
 */
interface EachProps<T> {
  /**
   * The array of items to iterate over.
   */
  of: T[];

  /**
   * The rendering function for each item.
   *
   * @param {T} item - The current item being rendered.
   * @param {number} index - The index of the current item.
   * @returns {React.ReactNode} - The React node to render for the current item.
   */
  render: (item: T, index: number) => React.ReactNode;
}

/**
 * A generic React component that iterates over an array and renders each item using a provided rendering function.
 *
 * @template T - The type of items in the array.
 * @param {EachProps<T>} props - The component props.
 * @returns {React.ReactNode} - The rendered React node.
 */
export function Each<T>({ of, render }: EachProps<T>): React.ReactNode {
  return <>{of.map((item, index) => render(item, index))}</>;
}
