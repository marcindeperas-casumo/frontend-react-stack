// @flow
import { useSelector, shallowEqual } from "react-redux";
import { playerSessionIsValidSelector } from "Models/player";
import { ROUTE_IDS } from "Src/constants";
import { useCrossCodebaseNavigation } from "Utils/hooks";

export function usePlayerSessionInvalidRedirect() {
  const { navigateToKO } = useCrossCodebaseNavigation();

  return useSelector(state => {
    const valid = playerSessionIsValidSelector(state);

    if (valid === false) {
      navigateToKO(ROUTE_IDS.LOGIN);
    }

    return valid;
  }, shallowEqual);
}
