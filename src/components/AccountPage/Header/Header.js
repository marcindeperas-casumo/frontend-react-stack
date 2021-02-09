// @flow
import * as React from "react";
import { useMedia } from "react-use";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import { getMediaQuery, desktopBreakpoint } from "Components/ResponsiveLayout";

type Props = {
  children: React.Node,
};

export function Header({ children }: Props) {
  const isDesktop = useMedia(getMediaQuery(desktopBreakpoint));

  return (
    <Text
      tag="h3"
      size={isDesktop ? "md" : "default"}
      className={cx(
        "u-font-weight-bold",
        "u-padding-top--lg u-padding-top--xlg@desktop u-padding-bottom--md"
      )}
    >
      {children}
    </Text>
  );
}
