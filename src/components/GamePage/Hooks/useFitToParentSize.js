// @flow
import { useDebounce, useWindowSize } from "react-use";
import { useGameModelContext, usePinnedWidgetsContext } from "../Contexts";

export function useFitToParentSize(): void {
  const { gameProviderModel } = useGameModelContext();
  const { pinnedWidgets } = usePinnedWidgetsContext();
  const { width, height } = useWindowSize();

  useDebounce(
    () => {
      // $FlowIgnore
      gameProviderModel?.fitToParentSize(); // eslint-disable-line no-unused-expressions
    },
    200,
    [pinnedWidgets, width, height]
  );
}
