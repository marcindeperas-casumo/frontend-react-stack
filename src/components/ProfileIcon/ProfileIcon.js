// @flow
import React, { useState, useEffect } from "react";
import cx from "classnames";
import { type BeltType } from "Models/adventure";
import { ProgressCircle } from "Components/Progress";
import { CasumoAvatar } from "Components/CasumoAvatar";
import "./ProfileIcon.scss";

type Props = {
  onClick?: ?(event: SyntheticEvent<HTMLButtonElement>) => void,
  className?: string,
  level: number,
  belt: BeltType,
  inBonusMode?: boolean,
  progressPercentage: number,
};

export const ProfileIcon = ({
  onClick = (event: SyntheticEvent<HTMLButtonElement>) => {},
  className = "",
  level,
  belt,
  inBonusMode = false,
  progressPercentage,
}: Props = {}) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(false);

    setTimeout(() => {
      setAnimating(true);
    }, 0);
  }, [progressPercentage]);

  return (
    <div
      onClick={onClick}
      className={cx(
        "c-profile-icon u-position-relative u-height--3xlg u-width--3xlg t-border-r--circle",
        className
      )}
    >
      <div className="c-profile-icon__info u-height--2xlg u-width--2xlg u-overflow--hidden t-border-r--circle t-background-grey-90 t-opacity-background--100">
        <CasumoAvatar
          variant="sm"
          className="c-profile-icon__avatar u-position-absolute u-width--xlg"
          belt={belt}
          level={level}
        />
      </div>
      <ProgressCircle
        value={progressPercentage}
        fgColor="grey-20"
        bgColor="grey-50"
        fgClassName={cx({ "c-profile-icon__progress--animating": animating })}
        className="c-profile-icon__progress t-opacity-color--25 u-height--3xlg u-width--3xlg u-position-absolute"
        width={4}
        radius={24}
      />
    </div>
  );
};
