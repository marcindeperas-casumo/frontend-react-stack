// @flow
import { useEffect, useState } from "react";
import debounce from "lodash/debounce";

export const useResize = () => {
  // eslint-disable-next-line no-unused-vars
  const [windowInnerWidth, setWindowInnerWidth] = useState({
    windowInnerWidth: window.innerWidth,
  });

  useEffect(() => {
    const handleWindowResizeDebounced = debounce(
      () => setWindowInnerWidth({ windowInnerWidth: window.innerWidth }),
      1000
    );
    window.addEventListener("resize", handleWindowResizeDebounced);

    return () => {
      window.removeEventListener("resize", handleWindowResizeDebounced);
    };
  }, [setWindowInnerWidth]);
};
