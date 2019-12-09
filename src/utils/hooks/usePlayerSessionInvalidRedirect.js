// @flow
import { useSelector, shallowEqual } from "react-redux";
import { playerSessionIsValidSelector } from "Models/session";
import { languageSelector } from "Models/handshake";
import { redirectToTranslatedUrl, ROUTE_IDS } from "Components/Router";

export function usePlayerSessionInvalidRedirect() {
  return useSelector(state => {
    const valid = playerSessionIsValidSelector(state);

    if (valid === false) {
      const language = languageSelector(state);

      redirectToTranslatedUrl(language, ROUTE_IDS.LOGIN);
    }

    return valid;
  }, shallowEqual);
}
