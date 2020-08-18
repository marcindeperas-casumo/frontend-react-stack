// @flow

import React, { useState } from "react";
import Flex from "@casumo/cmp-flex";
import { ChevronUpIcon, ChevronDownIcon } from "@casumo/cmp-icons";
import AvatarIcon from "./icons/profileAvatar.svg";
import "./ProfileIcon.scss";

const ProfileIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <span onClick={toggleDrawer}>
      {isOpen ? (
        <ChevronUpIcon className="t-color-white u-margin-left" />
      ) : (
        <Flex
          align="center"
          justify="center"
          className="c-profile-icon t-background-grey-0 u-position-relative u-height--2xlg u-width--2xlg u-zindex--content-overlay t-border-r--circle t-border--xlg t-border-grey-90 t-opacity-border--25
           t-border-orange-30"
        >
          <AvatarIcon />
          <ChevronDownIcon
            size="sm"
            className="c-profile-icon__chevron-icon t-color-black t-background-white u-position-absolute t-border-r--circle"
          />
        </Flex>
      )}
    </span>
  );
};

export default ProfileIcon;
