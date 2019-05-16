import React from "react";
import { storiesOf } from "@storybook/react";
import SportsNavPagerButton from "./SportsNavPagerButton";

const stories = storiesOf("Sports/SportsNavPagerButton", module);

const defaultProps = {
  hasNextPage: false,
  hasPreviousPage: false,
  scrollableClickHandler: () => {},
};

const render = (props = {}) => () => (
  <div className="c-sports-shell--site">
    <div className="t-background-grey-light-1">
      <SportsNavPagerButton {...{ ...defaultProps, ...props }} />
    </div>
  </div>
);

stories.add("Not Desktop (hidden)", () => (
  <div className="t-background-grey-light-1">
    <SportsNavPagerButton {...defaultProps} />
  </div>
));

stories.add("No Pages", render());

stories.add("Start of Scroll", render({ hasPreviousPage: true }));

stories.add(
  "Middle of Scroll",
  render({ hasPreviousPage: true, hasNextPage: true })
);

stories.add("End of Scroll", render({ hasNextPage: true }));
