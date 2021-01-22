// @flow
import { useDebounce } from "react-use";
import { useGameModelContext, usePinnedWidgetsContext } from "../Contexts";

export function useFitToParentSize(): void {
  const { gameProviderModel } = useGameModelContext();
  const { pinnedWidgets } = usePinnedWidgetsContext();

  useDebounce(
    () => {
      // $FlowIgnore
      gameProviderModel?.fitToParentSize(); // eslint-disable-line no-unused-expressions
    },
    100,
    [pinnedWidgets]
  );
}
