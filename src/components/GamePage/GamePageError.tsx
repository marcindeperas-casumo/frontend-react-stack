import React from "react";
import Flex from "@casumo/cmp-flex";
import { ErrorMessage } from "Components/ErrorMessage";

export const GamePageError = ({ onRetry, errorMessage }) => (
  <Flex className="t-background-grey-0 u-height--full">
    <ErrorMessage errorMessage={errorMessage} retry={onRetry} />
  </Flex>
);
