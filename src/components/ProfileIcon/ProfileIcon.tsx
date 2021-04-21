import React, { useState, useEffect } from "react";
import cx from "classnames";
import { BeltType } from "Models/adventure";
import { ProgressCircle } from "Components/Progress";
import { CasumoAvatar } from "Components/CasumoAvatar";
import "./ProfileIcon.scss";

type Props = {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
  level: number;
  belt: BeltType;
  inBonusMode?: boolean;
  progressPercentage: number;
};

export const ProfileIcon = ({
  onClick = () => {},
  className = "",
  level,
  belt,
  inBonusMode = false,
  progressPercentage,
}: Props) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(false);

    setTimeout(() => {
      setAnimating(true);
    }, 2000);
  }, [progressPercentage]);

  return (
    <div
      onClick={onClick}
      className={cx(
        "c-profile-icon o-position--relative u-height--3xlg u-width--3xlg t-border-r--circle",
        className
      )}
    >
      <div className="c-profile-icon__info u-height--2xlg u-width--2xlg u-overflow--hidden t-border-r--circle bg-grey-90 bg-opacity-100">
        <CasumoAvatar
          variant="sm"
          className="c-profile-icon__avatar o-position--absolute u-width--xlg"
          belt={belt}
          level={level}
        />
      </div>
      <ProgressCircle
        value={progressPercentage}
        fgColor="grey-20"
        bgColor="grey-50"
        fgClassName={cx({ "c-profile-icon__progress--animating": animating })}
        className="c-profile-icon__progress text-opacity-25 u-height--3xlg u-width--3xlg o-position--absolute"
        width={4}
        radius={24}
      />
    </div>
  );
};
