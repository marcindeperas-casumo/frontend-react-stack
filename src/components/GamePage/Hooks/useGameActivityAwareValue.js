// @flow
import { useMemoCompare } from "Utils/hooks";
import {
  useGameModelContext,
  useGameActivityStatusContext,
} from "Components/GamePage/Contexts";

type CompareFunctionType<T> = (
  previousValue: T,
  currentValue: T,
  isGameActive: boolean,
  balanceUpdatesPaused: boolean
) => boolean;

export function useGameActivityAwareValue<T>(
  value: T,
  compareFunction?: CompareFunctionType<T>
): T {
  const isGameActive = useGameActivityStatusContext();
  const { haltBalanceUpdates } = useGameModelContext();

  return useMemoCompare<T>(value, (previousValue, currentValue) => {
    // since balance should not update due to ongoing game activity
    // - return true aka balance is equal to previous to keep balance unchanged momentarily

    if (haltBalanceUpdates) {
      return true;
    }

    if (compareFunction) {
      return compareFunction(
        previousValue,
        currentValue,
        isGameActive,
        haltBalanceUpdates
      );
    }

    return isGameActive;
  });
}
