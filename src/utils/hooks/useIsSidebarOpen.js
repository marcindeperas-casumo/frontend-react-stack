// @flow
import { useSelector, shallowEqual } from "react-redux";
import { isSidebarOpen } from "Models/sidebar";

export function useIsSidebarOpen(): boolean {
  return useSelector(isSidebarOpen, shallowEqual);
}
