// @flow
import React from "react";
import cx from "classnames";
import AvatarIcon from "./icons/profileAvatar.svg";
import "./ProfileIcon.scss";

type Props = {
  onClick: ?Function,
  className?: string,
};

export const ProfileIcon = ({
  onClick = () => {},
  className = "",
}: Props = {}) => {
  return (
    <div
      onClick={onClick}
      className={cx(
        "c-profile-icon t-background-grey-0 u-position-relative u-height--2xlg u-width--2xlg",
        "t-border-r--circle t-border-grey-90 t-opacity-border--25 o-inset-top--none o-inset-left--none",
        className
      )}
    >
      <AvatarIcon className="c-profile-icon__avatar u-position-absolute" />
    </div>
  );
};
