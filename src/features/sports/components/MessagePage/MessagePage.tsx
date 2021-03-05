import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import "./MessagePage.scss";

type Props = {
  headingTermKey: string;
  messageTermKey: string;
  image: React.ReactNode;
};

export const MessagePage = ({
  image,
  headingTermKey,
  messageTermKey,
}: Props) => (
  <Flex
    direction="vertical"
    spacing="md"
    justify="center"
    align="center"
    className="o-flex--1 t-background-grey-0 t-color-grey-90 t-border-r--sm u-padding--lg c-message-page"
  >
    <Flex.Item>{image}</Flex.Item>
    <Flex.Item>
      <Text
        tag="h2"
        size="3xlg"
        className="u-text-align-center c-message-page__heading"
      >
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm termKey={headingTermKey} />
      </Text>
    </Flex.Item>
    <Flex.Item>
      <Text size="md" className="u-text-align-center">
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm termKey={messageTermKey} />
      </Text>
    </Flex.Item>
  </Flex>
);
