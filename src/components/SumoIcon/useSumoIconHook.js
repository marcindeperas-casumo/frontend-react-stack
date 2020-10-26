//@flow
import * as React from "react";
import { v4 as uuidV4 } from "uuid";
import { SumoIconContext } from "./SumoIconContext";

export const useSumoIcon = (currentProps: Object = {}) => {
  const iconId = React.useRef(uuidV4());
  const sumoIconContext = React.useContext(SumoIconContext);
  const { updateProps } = sumoIconContext;

  React.useEffect(() => {
    if (sumoIconContext.hasIcon(iconId.current)) {
      updateProps(iconId.current, currentProps);
    }
  }, [currentProps, sumoIconContext, updateProps]);

  const addIcon = React.useCallback(
    (icon: React.Component<*, *> | React.StatelessFunctionalComponent<*>) => {
      if (!sumoIconContext.hasIcon(iconId.current)) {
        sumoIconContext.addIcon(iconId.current, icon);
      }
    },
    [sumoIconContext]
  );

  const removeIcon = React.useCallback(() => {
    sumoIconContext.removeIcon(iconId.current);
  }, [sumoIconContext]);

  const hasIcon = React.useCallback(
    () => sumoIconContext.hasIcon(iconId.current),
    [sumoIconContext]
  );

  return {
    addIcon,
    removeIcon,
    hasIcon,
  };
};
