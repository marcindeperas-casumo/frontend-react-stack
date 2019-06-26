import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SportsNavPagerButtons } from "Features/sports/components/SportsNav";

const stories = storiesOf("Sports/SportsNavPagerButtons", module);

const defaultProps = {
  hasNextPage: false,
  hasPreviousPage: false,
  scrollableClickHandler: action("pager button clicked"),
};

const render = (props = {}) => () => (
  <div className="c-sports-shell--site">
    <div className="t-background-grey-light-1">
      <SportsNavPagerButtons {...{ ...defaultProps, ...props }} />
    </div>
  </div>
);

stories.add("Not Desktop (hidden)", () => (
  <div className="t-background-grey-light-1">
    <SportsNavPagerButtons {...defaultProps} />
  </div>
));

stories.add("No Pages", render());

stories.add("Start of Scroll", render({ hasPreviousPage: true }));

stories.add(
  "Middle of Scroll",
  render({ hasPreviousPage: true, hasNextPage: true })
);

stories.add("End of Scroll", render({ hasNextPage: true }));
