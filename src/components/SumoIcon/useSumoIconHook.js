//@flow
import * as React from "react";
import { v4 as uuidV4 } from "uuid";
import { SumoIconContext } from "./SumoIconContext";

export const useSumoIcon = (currentProps: Object = {}) => {
  const iconId = React.useRef(uuidV4());
  const [added, setAdded] = React.useState(false);
  const sumoIconContext = React.useContext(SumoIconContext);
  const { updateProps } = sumoIconContext;

  React.useEffect(() => {
    if (added) {
      updateProps(iconId.current, currentProps);
    }
  }, [added, currentProps, updateProps]);

  const addIcon = React.useCallback(
    (icon: React.Node) => {
      if (!added) {
        setAdded(true);
        sumoIconContext.addIcon(iconId.current, icon);
      }
    },
    [added, sumoIconContext]
  );

  const removeIcon = React.useCallback(() => {
    sumoIconContext.removeIcon(iconId.current, () => {
      setAdded(false);
    });
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
