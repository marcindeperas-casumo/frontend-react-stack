// @flow
import React from "react";
import type { Node } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import "./MessagePage.scss";

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
    className="o-flex--1 t-background-grey-light-2 t-color-grey-dark-3 t-border-r--4 u-padding--lg c-message-page"
  >
    <Flex.Item>{image}</Flex.Item>
    <Flex.Item>
      <Text
        tag="h2"
        size="3xlg"
        className="u-text-align-center c-message-page__heading"
      >
        <DictionaryTerm termKey={headingTermKey} />
      </Text>
    </Flex.Item>
    <Flex.Item>
      <Text size="md" className="u-text-align-center">
        <DictionaryTerm termKey={messageTermKey} />
      </Text>
    </Flex.Item>
  </Flex>
);

export { MessagePage };
