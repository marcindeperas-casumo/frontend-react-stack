// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

type Props = {
  tableOfContents: Array<{
    href: string,
    text: string,
  }>,
};

export function TableOfContents(props: Props) {
  return (
    <Flex
      direction="vertical"
      className="u-padding-y--md u-margin-x--md t-border-bottom"
    >
      {props.tableOfContents.map(({ href, text }) => {
        const [number, ...rest] = text.split(" ");

        return (
          <Flex
            key={href}
            className="u-font-weight-bold u-margin-y"
            align="center"
          >
            <Text tag="div" className="t-color-turquoise c-tac-list--number">
              {number}
            </Text>
            <a href={href} className="t-color-grey-dark-3">
              {rest.join(" ")}
            </a>
          </Flex>
        );
      })}
    </Flex>
  );
}
