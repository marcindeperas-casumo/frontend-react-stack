// @flow
import { useSelector, shallowEqual } from "react-redux";
import { isSidebarOpen } from "Models/sidebar";

export function useIsSidebarOpen(): boolean {
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'boolean'... Remove this comment to see the full error message
  return useSelector(isSidebarOpen, shallowEqual);
}
