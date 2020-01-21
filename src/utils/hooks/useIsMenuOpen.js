// @flow
import { useSelector, shallowEqual } from "react-redux";
import { isSidebarOpen } from "Models/sidebar";

export function useIsMenuOpen() {
  return useSelector(isSidebarOpen, shallowEqual);
}
