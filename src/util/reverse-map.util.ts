type Mapper<S, M> = (
  value: S,
  reverseIndex: number,
  index: number,
  array: S[]
) => M;

export function reverseMap<S, M>(list: S[], mapper: Mapper<S, M>): M[] {
  return list
    .slice(0)
    .reverse()
    .map((value, index, array) =>
      mapper(value, list.length - index - 1, index, array)
    );
}
