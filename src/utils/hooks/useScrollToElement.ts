import * as React from "react";

export const useScrollToElement = () => {
  const scrollableItemsRef = React.useRef([]);
  const scrollToElement = React.useCallback(
    index => {
      scrollableItemsRef.current[index].scrollIntoView();
    },
    [scrollableItemsRef]
  );

  return {
    scrollableItemsRef,
    scrollToElement,
  };
};
