// @flow
// @flow
import { useMemoCompare } from "Utils/hooks";
import { useGameActivityStatusContext } from "../Contexts";

type CompareFunctionType = (
  previousValue: any,
  currentValue: any,
  isGameActive: boolean
) => boolean;

export const useGameActivityAwareValue = (
  value: any,
  compareFunction?: CompareFunctionType
) => {
  const isGameActive = useGameActivityStatusContext();

  return useMemoCompare(value, (previousValue, currentValue) => {
    if (compareFunction) {
      return compareFunction(previousValue, currentValue, isGameActive);
    }

    return isGameActive;
  });
};
