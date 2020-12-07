// @flow
import { useEffect, useRef } from "react";
import { WALLET_BALANCE_DELAY_DURATION } from "../../models/playing/playing.constants";

type CompareFunctionType<T> = (previousValue: T, currentValue: T) => boolean;

export function useMemoCompare<T>(next: T, compare: CompareFunctionType<T>): T {
  const previousRef = useRef<T>(next);
  const previous = previousRef.current;
  const isEqual = compare(previous, next);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    async function delayed() {
      // Timeout required in cases like blueribbon where the wallet event is received before the notification event
      await new Promise(resolve =>
        setTimeout(resolve, WALLET_BALANCE_DELAY_DURATION)
      );
      if (!isEqual) {
        // eslint-disable-next-line fp/no-mutation
        previousRef.current = next;
      }
      delayed();
    }
  }, [isEqual, next]);

  return isEqual ? previous : next;
}
