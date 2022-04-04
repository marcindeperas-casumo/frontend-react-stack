import Text from "@casumo/cmp-text";
import * as React from "react";

export function SectionHeader(props: { children: string }) {
  return (
    <Text className="u-font-weight-black u-padding--md u-padding-top--lg u-padding-top--2xlg@desktop text-grey-50">
      {props.children}
    </Text>
  );
}
