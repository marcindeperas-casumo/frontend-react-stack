// @flow
import { useEffect, useRef } from "react";

type CompareFunctionType = (previousValue: any, currentValue: any) => boolean;

export const useMemoCompare = (next: any, compare: CompareFunctionType) => {
  const previousRef = useRef();
  const previous = previousRef.current;
  const isEqual = compare(previous, next);

  useEffect(() => {
    if (!isEqual) {
      // eslint-disable-next-line fp/no-mutation
      previousRef.current = next;
    }
  });

  return isEqual ? previous : next;
};
