import debounce from "lodash.debounce";
import * as React from "react";
import * as R from "ramda";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "Components/ResponsiveLayout";
import { isTLDMarketSpecific } from "Utils";
import {
  setData,
  setScroll,
  getGamePage,
  getGamePageScrollPosition,
} from "Models/gameBrowser";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";

function getPage() {
  const tld = window.location.origin.split(".").pop(); // eslint-disable-line fp/no-mutating-methods

  return (
    window.location.pathname.split("/")[isTLDMarketSpecific(tld) ? 2 : 3] ||
    "top"
  );
}

export function useCurrentGamePage(path: string) {
  const dispatch = useDispatch();
  const page = getPage();
  const savedPage = useSelector(getGamePage(path), R.equals);
  if (page !== savedPage) {
    dispatch(setData(path)({ page }));
    dispatch(setScroll(path)(0));
  }

  return page;
}

export function useScrollPositionPersistor(path: string) {
  const dispatch = useDispatch();
  const scrollPos = useSelector(getGamePageScrollPosition(path), R.equals);

  React.useEffect(() => {
    const scrollEl = document.getElementById(ROOT_SCROLL_ELEMENT_ID);

    if (!scrollEl || isMobile()) {
      return;
    }

    const debouncedScrollHandler = debounce(() => {
      const val = scrollEl.scrollTop;
      if (val && val !== scrollPos) {
        dispatch(setScroll(path)(scrollEl.scrollTop));
      }
    }, 75);

    scrollEl.addEventListener("scroll", debouncedScrollHandler);

    return () => {
      scrollEl.removeEventListener("scroll", debouncedScrollHandler);
    };
  }, [dispatch, scrollPos, path]);
}

export function useSetScrollPosition(path: string, loading: boolean) {
  const scrollPos = useSelector(getGamePageScrollPosition(path), R.equals);
  const initialized = React.useRef(false);

  React.useEffect(() => {
    if (isMobile() || initialized.current || loading) {
      return;
    }

    const scrollEl = document.getElementById(ROOT_SCROLL_ELEMENT_ID);
    if (!scrollEl || scrollPos > scrollEl.scrollHeight) {
      return;
    }

    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
    scrollEl.scrollTo(0, scrollPos);
    initialized.current = true; // eslint-disable-line fp/no-mutation
  });
}
