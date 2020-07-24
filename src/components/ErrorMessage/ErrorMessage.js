// @flow
import React from "react";
import classNames from "classnames";
import { equals, unless } from "ramda";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import SadSumo from "./sad-sumo.svg";
import "./ErrorMessage.scss";

type Direction = "horizontal" | "vertical";

type ComponentProps = {
  direction: Direction,
  errorMessage: string,
};

type RetryProps = {
  retryMessage: string,
  retry: () => () => void,
};

type Props = RetryProps & ComponentProps;

const DEFAULT_ERROR_MESSAGE = "Loading failed";
const DEFAULT_RETRY_MESSAGE = "Try again";

const noop = () => () => {};

const renderRetry = ({ retry, retryMessage }: RetryProps) => () => (
  <Flex.Item>
    <ButtonPrimary
      size="sm"
      data-test="error-message-retry-button"
      // $FlowFixMe
      onClick={retry}
    >
      {retryMessage}
    </ButtonPrimary>
  </Flex.Item>
);

const renderRetryIfHandlerProvided = ({ retry, retryMessage }: RetryProps) =>
  unless(equals(noop), renderRetry({ retry, retryMessage }), retry);

export const ErrorMessage = ({
  direction = "vertical",
  errorMessage = DEFAULT_ERROR_MESSAGE,
  retryMessage = DEFAULT_RETRY_MESSAGE,
  retry = noop,
}: Props) => {
  const isVertical = direction === "vertical";
  const InnerFlex = isVertical ? Flex.Item : Flex.Block;

  const errorClassName = classNames(
    "u-font-weight-bold",
    "t-color-grey-50",
    !isVertical && "u-margin-y--none"
  );

  return (
    <Flex
      direction={direction}
      align="center"
      justify={isVertical ? "center" : "space-between"}
      className="o-flex--1 u-padding--md t-background-grey-0"
      spacing="lg"
      data-test="error-message-container"
    >
      <Flex.Item>
        <SadSumo
          width="42"
          data-test="error-message-sumo"
          className="c-error-message__icon u-display--block"
        />
      </Flex.Item>
      <InnerFlex>
        <Text
          data-test="error-message-error-message"
          className={errorClassName}
        >
          {errorMessage}
        </Text>
      </InnerFlex>
      {renderRetryIfHandlerProvided({ retry, retryMessage })}
    </Flex>
  );
};
