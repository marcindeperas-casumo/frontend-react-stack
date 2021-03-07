// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs/react";
import Flex from "@casumo/cmp-flex";
import { ErrorMessage } from "Components/ErrorMessage";

const stories = storiesOf("ErrorMessage", module);

const retry = action("retry clicked");

const renderError = (props = {}) => () => {
  const propsWithDefaults = {
    errorMessage: text("Error Message", "A wild error appeared!"),
    retryMessage: text("Retry Message", "Retry"),
    ...props,
  };

  return (
    <Flex
      className="t-background-grey-0 u-padding--3xlg"
      style={{ minHeight: 420 }}
    >
      {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'retry' is missing in type '{ errorMessag... Remove this comment to see the full error message */}
      <ErrorMessage {...propsWithDefaults} />
    </Flex>
  );
};

stories.add("Default View (Vertical)", renderError());

stories.add("Vertical with Retry", renderError({ retry }));

stories.add("Horizontal", renderError({ direction: "horizontal" }));

stories.add(
  "Horizontal with Retry",
  renderError({ retry, direction: "horizontal" })
);
