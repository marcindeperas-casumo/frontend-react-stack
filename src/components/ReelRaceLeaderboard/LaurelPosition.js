// @flow
import * as React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";
import { LaurelIcon } from "@casumo/cmp-icons";
import { getLaurelColor } from "Models/reelRaces/reelRaces.utils";

import "./LaurelPosition.scss";

type Props = {
  position: number,
  className?: string,
  highlighted?: boolean,
  showLaurel?: boolean,
  inverted?: boolean,
};

export const LaurelPosition = ({
  position,
  highlighted,
  inverted,
  showLaurel,
  className,
}: Props) => (
  <div
    className={cx(
      "c-laurel-position u-position-relative u-width--2xlg u-height--2xlg",
      className
    )}
  >
    {showLaurel && (
      <LaurelIcon
        className={cx(
          `u-width--2xlg u-height--2xlg t-color-${getLaurelColor(
            position,
            highlighted
          )}`,
          {
            "t-opacity-color--25": highlighted && position === 1,
          }
        )}
      />
    )}
    <Text
      tag="div"
      className={cx(
        "c-laurel-position__text u-position-absolute u-font-weight-bold u-inset-0 u-text-align-center",
        {
          "t-color-grey-90": !inverted,
          "t-color-white": inverted && !highlighted,
        }
      )}
      size={position >= 100 && showLaurel ? "xs" : "sm"}
    >
      {position}
    </Text>
  </div>
);
