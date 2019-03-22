// @flow
import React from "react";
import type { Node } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

type Props = {
  heading: string,
  message: string,
  image: Node,
};

const MessagePage = ({ image, heading, message }: Props) => (
  <Flex
    direction="vertical"
    spacing="md"
    justify="center"
    align="center"
    className="t-background-grey-light-2 o-flex--1 u-padding--lg t-color-grey-dark-4"
  >
    <Flex.Item>{image}</Flex.Item>
    <Flex.Item>
      <Text tag="h2" size="4xlg" className="u-text-align-center">
        {heading}
      </Text>
    </Flex.Item>
    <Flex.Item>
      <Text className="u-text-align-center">{message}</Text>
    </Flex.Item>
  </Flex>
);

export default MessagePage;
