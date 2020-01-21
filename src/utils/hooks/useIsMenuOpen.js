// @flow
import { useSelector, shallowEqual } from "react-redux";
import { isMenuOpen } from "Models/menu";

export function useIsMenuOpen() {
  return useSelector(isMenuOpen, shallowEqual);
}
