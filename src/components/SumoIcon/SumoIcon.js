//@flow
import * as React from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import cx from "classnames";
import { SumoIconContext } from "./SumoIconContext";
import SumoIconConfetti from "./SumoIconConfettiContainer";

import "./SumoIcon.scss";

export type SumoIconProps = {
  onClick?: () => void,
  openedState?: boolean,
};

const baseClassName = "c-sumo-icon";

export const SumoIcon = ({
  onClick = () => {},
  openedState = false,
}: SumoIconProps) => {
  const {
    primaryIcon: PrimaryIcon,
    primaryIconProps,
    secondaryIcon: SecondaryIcon,
    secondaryIconProps,
    isTransitionRunning,
  } = React.useContext(SumoIconContext);

  return (
    <>
      <SumoIconConfetti />
      <div
        onClick={onClick}
        className={cx(
          baseClassName,
          "u-position-relative u-height--3xlg u-width--3xlg",
          "t-border-r--circle u-margin-right--md u-cursor--pointer",
          "u-position-absolute@mobile u-zindex--header"
        )}
      >
        <div
          className={cx(
            "t-border-r--circle u-height--full u-overflow--hidden u-position-relative"
          )}
        >
          {PrimaryIcon && (
            <div
              className={cx(
                `${baseClassName}__content`,
                "u-height--3xlg u-width--3xlg u-position-absolute",
                {
                  [`${baseClassName}__content--old`]: isTransitionRunning,
                }
              )}
            >
              {/* $FlowIgnore */}
              <PrimaryIcon {...primaryIconProps} />
            </div>
          )}
          {SecondaryIcon && (
            <div
              className={cx(
                `${baseClassName}__content`,
                "u-height--3xlg u-width--3xlg u-position-absolute",
                {
                  [`${baseClassName}__content--next`]: isTransitionRunning,
                }
              )}
            >
              {/* $FlowIgnore */}
              <SecondaryIcon {...secondaryIconProps} />
            </div>
          )}
        </div>
        <ChevronDownIcon
          size="sm"
          className={cx(
            `${baseClassName}__chevron-icon`,
            `t-color-black t-opacity-background--100 t-background-white u-position-absolute t-border-r--circle u-cursor--pointer`,
            {
              [`${baseClassName}__chevron-icon--visible`]: !openedState,
              [`${baseClassName}__chevron-icon--hidden`]: openedState,
            }
          )}
        />
        <Flex
          className={cx(
            `${baseClassName}__close-drawer`,
            "u-position-absolute u-height--3xlg u-width--3xlg",
            "t-border-r--circle u-margin-right--md u-cursor--pointer",
            "t-color-white u-position-absolute@mobile u-zindex--header",
            {
              [`${baseClassName}__close-drawer--visible`]: openedState,
              [`${baseClassName}__close-drawer--hidden`]: !openedState,
            }
          )}
          align="center"
          justify="center"
        >
          <Flex.Item>
            <ChevronUpIcon />
          </Flex.Item>
        </Flex>
      </div>
    </>
  );
};
