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
    <Flex direction="vertical">
      {props.tableOfContents.map(({ href, text }) => {
        const [number, ...rest] = text.split(" ");

        return (
          <a key={href} href={href}>
            <Flex key={href} className="u-padding--md">
              <Text
                tag="div"
                size="sm"
                className="c-tac-list--number u-font-weight-bold u-text-align-left u-margin-right--sm"
              >
                {number}
              </Text>
              <Text
                tag="div"
                size="sm"
                className="u-width--full t-color-blue-60"
              >
                {rest.join(" ")}
              </Text>
            </Flex>
          </a>
        );
      })}
    </Flex>
  );
}
