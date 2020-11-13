// @flow
import { useEffect, useRef } from "react";

type CompareFunctionType<T> = (previousValue: T, currentValue: T) => boolean;

export function useMemoCompare<T>(next: T, compare: CompareFunctionType<T>): T {
  const previousRef = useRef<T>(next);
  const previous = previousRef.current;
  const isEqual = compare(previous, next);

  useEffect(() => {
    if (!isEqual) {
      // eslint-disable-next-line fp/no-mutation
      previousRef.current = next;
    }
  });

  return isEqual ? previous : next;
}
