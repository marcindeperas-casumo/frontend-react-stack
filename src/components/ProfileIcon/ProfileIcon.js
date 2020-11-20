// @flow
import React from "react";
import cx from "classnames";
import { ProgressCircle } from "Components/Progress/ProgressCircle";
import { CasumoAvatar } from "Components/CasumoAvatar";
import "./ProfileIcon.scss";

type Props = {
  onClick?: ?(event: SyntheticEvent<HTMLButtonElement>) => void,
  className?: string,
};

export const ProfileIcon = ({
  onClick = (event: SyntheticEvent<HTMLButtonElement>) => {},
  className = "",
}: Props = {}) => {
  return (
    <div
      onClick={onClick}
      className={cx(
        "c-profile-icon u-position-relative u-height--3xlg u-width--3xlg t-border-r--circle",
        className
      )}
    >
      <div className="c-profile-icon__info u-height--2xlg u-width--2xlg u-overflow--hidden t-border-r--circle t-opacity-background--100 t-background-grey-0">
        <CasumoAvatar
          variant="sm"
          className="c-profile-icon__avatar u-position-absolute u-width--xlg"
        />
      </div>
      <ProgressCircle
        value={0}
        bgColor="grey-50"
        className="c-profile-icon__progress t-opacity-color--25 u-height--3xlg u-width--3xlg u-position-absolute"
        width={4}
        radius={24}
      />
    </div>
  );
};
