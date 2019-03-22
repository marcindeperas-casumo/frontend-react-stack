// @flow
import React from "react";
import type { Node } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";

type Props = {
  headingTermKey: string,
  messageTermKey: string,
  image: Node,
};

const MessagePage = ({ image, headingTermKey, messageTermKey }: Props) => (
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
        <DictionaryTerm termKey={headingTermKey} />
      </Text>
    </Flex.Item>
    <Flex.Item>
      <Text className="u-text-align-center">
        <DictionaryTerm termKey={messageTermKey} />
      </Text>
    </Flex.Item>
  </Flex>
);

export default MessagePage;
