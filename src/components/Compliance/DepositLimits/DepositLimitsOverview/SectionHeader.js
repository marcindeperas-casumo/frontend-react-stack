// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";

export function SectionHeader(props: { children: string }) {
  return (
    <Text className="u-font-weight-black u-padding--md u-padding-top--lg u-padding-top--2xlg@desktop t-color-grey-50">
      {props.children}
    </Text>
  );
}
