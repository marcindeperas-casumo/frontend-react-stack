import { useDebounce, useWindowSize } from "react-use";
import { useGameModelContext, usePinnedWidgetsContext } from "../Contexts";

export function useFitToParentSize(): void {
  const { gameProviderModel } = useGameModelContext();
  const { pinnedWidgets } = usePinnedWidgetsContext();
  const { width, height } = useWindowSize();

  useDebounce(
    () => {
      gameProviderModel?.fitToParentSize();
    },
    200,
    [pinnedWidgets, width, height]
  );
}
