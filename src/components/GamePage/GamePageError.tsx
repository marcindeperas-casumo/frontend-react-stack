import React from "react";
import Flex from "@casumo/cmp-flex";
import { ErrorMessage } from "Components/ErrorMessage";

export const GamePageError = ({ onRetry, errorMessage }) => (
  <Flex className="t-background-grey-0 u-height--full">
    {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'retryMessage' is missing in type '{ erro... Remove this comment to see the full error message */}
    <ErrorMessage errorMessage={errorMessage} retry={onRetry} />
  </Flex>
);
