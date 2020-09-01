// @flow
import * as React from "react";
import * as R from "ramda";
import { useLocation } from "@reach/router";
import { useDispatch, useSelector } from "react-redux";
import { isTLDMarketSpecific } from "Utils";
import {
  setScroll,
  getGamePageScrollPosition,
  setData,
} from "Models/gameBrowser";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";

export function useCurrentGamePage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const tld = window.location.origin.split(".").pop(); // eslint-disable-line fp/no-mutating-methods
  const page =
    location.pathname.split("/")[isTLDMarketSpecific(tld) ? 2 : 3] || "top";
  dispatch(setData({ page }));

  return page;
}

export function useScrollPositionPersistor() {
  const dispatch = useDispatch();
  const scrollPos = useSelector(getGamePageScrollPosition);

  React.useEffect(() => {
    const scrollEl = document.getElementById(ROOT_SCROLL_ELEMENT_ID);

    if (!scrollEl) {
      return;
    }

    function scrollHandler() {
      const val = scrollEl.scrollTop;
      if (val && val !== scrollPos) {
        dispatch(setScroll(scrollEl.scrollTop));
      }
    }

    scrollEl.addEventListener("scroll", scrollHandler);

    return () => {
      scrollEl.removeEventListener("scroll", scrollHandler);
    };
  }, [dispatch, scrollPos]);
}

export function useSetScrollPosition() {
  const scrollPos = useSelector(getGamePageScrollPosition, R.T);
  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (initialized.current) {
      return;
    }

    const scrollEl = document.getElementById(ROOT_SCROLL_ELEMENT_ID);
    if (!scrollEl || scrollPos > scrollEl.scrollHeight) {
      return;
    }

    scrollEl.scrollTo(0, scrollPos);
    initialized.current = true; // eslint-disable-line fp/no-mutation
  });
}
