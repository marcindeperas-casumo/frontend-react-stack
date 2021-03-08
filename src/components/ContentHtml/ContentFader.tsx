import Flex from "@casumo/cmp-flex";
import * as React from "react";
import cx from "classnames";
import "./ContentFader.scss";

type Props = {
  to: "top" | "bottom";
};

export function ContentFader({ to }: Props) {
  return (
    <Flex
      align="center"
      justify="center"
      className={cx(
        "o-position--absolute o-inset-left--none",
        "u-padding-x--lg u-width--full",
        `s-content-fader--${to}`
      )}
    >
      <div
        className={cx(
          "u-height--5xlg u-width--full",
          "t-color-white",
          `s-content-fader--${to}__child`
        )}
      />
    </Flex>
  );
}
