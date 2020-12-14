// @flow
import { useMemoCompare } from "Utils/hooks";
import { useGameActivityStatusContext } from "Components/GamePage/Contexts";

type CompareFunctionType<T> = (
  previousValue: T,
  currentValue: T,
  isGameActive: boolean
) => boolean;

export function useGameActivityAwareValue<T>(
  value: T,
  compareFunction?: CompareFunctionType<T>
): T {
  const {
    active: isGameActive,
    blueRibbonBusy,
  } = useGameActivityStatusContext();

  return useMemoCompare<T>(value, (previousValue, currentValue) => {
    // since balance should not update due to ongoing game activity
    // if blueribbon notification added cometD event is received (which waits for user to click cta)
    // - return true aka balance is equal to previous to keep balance unchanged momentarily
    if (blueRibbonBusy || isGameActive) {
      return true;
    }
    if (compareFunction) {
      return compareFunction(previousValue, currentValue, isGameActive);
    }

    return isGameActive;
  });
}
