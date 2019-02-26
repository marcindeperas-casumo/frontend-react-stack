// @flow
import { storiesOf } from "@storybook/react";
import React from "react";
import { F } from "ramda";

import ErrorMessage from "Features/sports/components/ErrorMessage";

const stories = storiesOf("Sports/ErrorMessage", module);

const retry = async () => {
  await setTimeout(F, 1991);
};

stories.add("Default View (Vertical)", () => <ErrorMessage />);

stories.add("Vertical with Retry", () => <ErrorMessage retry={retry} />);

stories.add("Horizontal", () => <ErrorMessage direction="horizontal" />);

stories.add("Horizontal with Retry", () => (
  <ErrorMessage direction="horizontal" retry={retry} />
));
