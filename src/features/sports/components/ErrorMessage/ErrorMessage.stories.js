// @flow
import { storiesOf } from "@storybook/react";
import React from "react";
import { F } from "ramda";

import Flex from "@casumo/cmp-flex";

import ErrorMessage from "Features/sports/components/ErrorMessage";

const stories = storiesOf("Sports/ErrorMessage", module);

const retry = async () => {
  await setTimeout(F, 1991);
};

const renderError = (props = {}) => () => (
  <Flex
    className="t-background-grey-light-2 u-padding--2xlg"
    style={{ minHeight: 420 }}
  >
    <ErrorMessage {...props} />
  </Flex>
);

stories.add("Default View (Vertical)", renderError());

stories.add("Vertical with Retry", renderError({ retry }));

stories.add("Horizontal", renderError({ direction: "horizontal" }));

stories.add(
  "Horizontal with Retry",
  renderError({ retry, direction: "horizontal" })
);
