// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import "./ContentFader.scss";

export function ContentFader() {
  return (
    <Flex
      align="center"
      justify="center"
      className={cx(
        "o-position--absolute o-inset-left--none",
        "u-padding-x--lg u-width--full",
        "s-content-fader"
      )}
    >
      <div
        className={cx(
          "u-height--5xlg u-width--full",
          "t-color-white",
          "s-content-fader__child"
        )}
      />
    </Flex>
  );
}
