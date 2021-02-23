// @flow
import { useSelector, shallowEqual } from "react-redux";
import { languageSelector } from "Models/handshake";

export function useLanguage() {
  return useSelector(languageSelector, shallowEqual);
}
