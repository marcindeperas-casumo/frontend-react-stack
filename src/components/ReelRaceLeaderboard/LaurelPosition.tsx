import Text from "@casumo/cmp-text";
import { LaurelIcon } from "@casumo/cmp-icons";
import * as React from "react";
import cx from "classnames";
import { getLaurelClassName } from "Models/reelRaces/reelRaces.utils";

import "./LaurelPosition.scss";

type Props = {
  position: number;
  className?: string;
  highlighted?: boolean;
  showLaurel?: boolean;
  inverted?: boolean;
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
      "c-laurel-position o-position--relative u-width--2xlg u-height--2xlg",
      className
    )}
  >
    {showLaurel && (
      <LaurelIcon
        className={cx(
          `u-width--2xlg u-height--2xlg ${getLaurelClassName(
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
        "c-laurel-position__text o-position--absolute u-font-weight-bold o-inset-x--none o-inset-y--none u-text-align-center",
        {
          "text-grey-90": !inverted,
          "text-white": inverted && !highlighted,
        }
      )}
      size={position >= 100 && showLaurel ? "xs" : "sm"}
    >
      {position}
    </Text>
  </div>
);
