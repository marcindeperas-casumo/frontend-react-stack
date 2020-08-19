// @flow
import React from "react";
import { ChevronDownIcon } from "@casumo/cmp-icons";
import AvatarIcon from "./icons/profileAvatar.svg";
import "./ProfileIcon.scss";

type Props = {
  onClick: Function,
};

export const ProfileIcon = ({ onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="c-profile-icon t-background-grey-0 u-position-relative u-height--2xlg u-width--2xlg u-zindex--content-overlay
        t-border-r--circle t-border--xlg t-border-grey-90 t-opacity-border--25 o-inset-top--none u-margin-top--md o-inset-left--none u-margin-left"
    >
      <AvatarIcon className="c-profile-icon__avatar u-position-absolute" />
      <ChevronDownIcon
        size="sm"
        className="c-profile-icon__chevron-icon t-color-black t-background-white u-position-absolute t-border-r--circle"
      />
    </div>
  );
};
