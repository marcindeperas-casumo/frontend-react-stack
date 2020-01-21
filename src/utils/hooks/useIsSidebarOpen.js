// @flow
import { useSelector, shallowEqual } from "react-redux";
import { isSidebarOpen } from "Models/sidebar";

export function useIsSidebarOpen() {
  return useSelector(isSidebarOpen, shallowEqual);
}
