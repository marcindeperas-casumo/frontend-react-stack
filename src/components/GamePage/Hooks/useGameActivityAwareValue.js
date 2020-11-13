// @flow
import { useMemoCompare } from "Utils/hooks";
import { useGameActivityStatusContext } from "../Contexts";

type CompareFunctionType<T> = (
  previousValue: T,
  currentValue: T,
  isGameActive: boolean
) => boolean;

export function useGameActivityAwareValue<T>(
  value: T,
  compareFunction?: CompareFunctionType<T>
): T {
  const isGameActive = useGameActivityStatusContext();

  return useMemoCompare<T>(value, (previousValue, currentValue) => {
    if (compareFunction) {
      return compareFunction(previousValue, currentValue, isGameActive);
    }

    return isGameActive;
  });
}
