import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import SportsScrollablePaginatedButton from "./SportsScrollablePaginatedButton";

const stories = storiesOf("Sports/SportsScrollablePaginatedButton", module);

const defaultProps = {
  scrollableState: {
    startColumn: 0,
    stopColumn: 12,
    visibleColumns: 6,
    scrollLeft: null,
    isEndOfScroll: false,
    isStartOfScroll: false,
  },
  scrollableClickHandler: () => {},
};

const render = (props = {}) => () => (
  <div className="t-background-grey-light-1">
    <SportsScrollablePaginatedButton {...{ ...defaultProps, ...props }} />
  </div>
);

stories.add(
  "No Pages",
  render({ scrollableState: { isStartOfScroll: true, isEndOfScroll: true } }),
  info({ text: "No Pages" })
);

stories.add(
  "Start of Scroll",
  render({ scrollableState: { isStartOfScroll: true } }),
  info({ text: "No Pages" })
);

stories.add("Middle of Scroll", render(), info({ text: "No Pages" }));

stories.add(
  "End of Scroll",
  render({ scrollableState: { isEndOfScroll: true } }),
  info({ text: "No Pages" })
);
