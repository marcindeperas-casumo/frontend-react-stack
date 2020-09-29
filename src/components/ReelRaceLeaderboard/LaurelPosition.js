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
};

export const LaurelPosition = ({ position, highlighted, className }: Props) => (
  <div className="c-laurel-position u-position-relative u-width--2xlg u-height--2xlg">
    <LaurelIcon
      className={cx(
        `u-width--2xlg u-height--2xlg t-color-${getLaurelColor(
          position,
          highlighted
        )}`,
        {
          "t-opacity-color--25": highlighted && position === 1,
        },
        className
      )}
    />
    <Text
      tag="div"
      className="c-laurel-position__text u-position-absolute t-color-grey-90 u-font-weight-bold"
      size={position >= 100 ? "xs" : "sm"}
    >
      {position}
    </Text>
  </div>
);
