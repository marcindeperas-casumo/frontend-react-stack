// @flow
import React from "react";
import { equals, unless } from "ramda";

import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

import SadSumo from "./sad-sumo.svg";

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

const renderRetryIfHandlerProvided = ({ retry, retryMessage }: RetryProps) =>
  unless(equals(noop), renderRetry({ retry, retryMessage }), retry);

const renderRetry = ({ retry, retryMessage }: RetryProps) => () => (
  <Flex.Item>
    <Button variant="outline-positive" onClick={retry}>
      {retryMessage}
    </Button>
  </Flex.Item>
);

const noop = () => () => undefined;

export default ({
  direction = "vertical",
  errorMessage = DEFAULT_ERROR_MESSAGE,
  retryMessage = DEFAULT_RETRY_MESSAGE,
  retry = noop,
}: Props) => {
  const InnerFlex = direction === "horizontal" ? Flex.Block : Flex.Item;

  return (
    <Flex
      direction={direction}
      align="center"
      justify={direction === "horizontal" ? "space-between" : "center"}
      className="o-flex--1 u-padding--md"
      spacing="lg"
    >
      <Flex.Item>
        <SadSumo className="u-display--block" />
      </Flex.Item>
      <InnerFlex>
        <Text className="u-font-weight-bold u-margin-vert--none">
          {errorMessage}
        </Text>
      </InnerFlex>
      {renderRetryIfHandlerProvided({ retry, retryMessage })}
    </Flex>
  );
};
