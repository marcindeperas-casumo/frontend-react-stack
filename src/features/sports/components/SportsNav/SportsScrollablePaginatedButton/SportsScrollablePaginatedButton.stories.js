import React from "react";
import { storiesOf } from "@storybook/react";
import SportsScrollablePaginatedButton from "./SportsScrollablePaginatedButton";

const stories = storiesOf("Sports/SportsScrollablePaginatedButton", module);

const defaultProps = {
  hasNextPage: false,
  hasPreviousPage: false,
  scrollableClickHandler: () => {},
};

const render = (props = {}) => () => (
  <div className="t-background-grey-light-1">
    <SportsScrollablePaginatedButton {...{ ...defaultProps, ...props }} />
  </div>
);

stories.add("No Pages", render());

stories.add("Start of Scroll", render({ hasPreviousPage: true }));

stories.add(
  "Middle of Scroll",
  render({ hasPreviousPage: true, hasNextPage: true })
);

stories.add("End of Scroll", render({ hasNextPage: true }));
