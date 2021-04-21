import { ChevronUpIcon, ChevronDownIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import * as React from "react";
import cx from "classnames";
import { SumoIconContext } from "./SumoIconContext";
import SumoIconConfetti from "./SumoIconConfettiContainer";

import "./SumoIcon.scss";

export type SumoIconProps = {
  onClick?: () => void;
  openedState?: boolean;
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
          "o-position--relative u-height--3xlg u-width--3xlg",
          "t-border-r--circle u-margin-right--md u-cursor--pointer",
          "o-position--absolute@mobile u-zindex--header"
        )}
      >
        <div
          className={cx(
            "t-border-r--circle u-height--full o-position--relative",
            { "u-overflow--hidden": isTransitionRunning }
          )}
        >
          {PrimaryIcon && (
            <div
              className={cx(
                `${baseClassName}__content`,
                "u-height--3xlg u-width--3xlg o-position--absolute",
                {
                  [`${baseClassName}__content--old`]: isTransitionRunning,
                }
              )}
            >
              {/* @ts-expect-error ts-migrate(2604) FIXME: JSX element type 'PrimaryIcon' does not have any c... Remove this comment to see the full error message */}
              <PrimaryIcon {...primaryIconProps} />
            </div>
          )}
          {SecondaryIcon && (
            <div
              className={cx(
                `${baseClassName}__content`,
                "u-height--3xlg u-width--3xlg o-position--absolute",
                {
                  [`${baseClassName}__content--next`]: isTransitionRunning,
                }
              )}
            >
              {/* @ts-expect-error ts-migrate(2604) FIXME: JSX element type 'SecondaryIcon' does not have any... Remove this comment to see the full error message */}
              <SecondaryIcon {...secondaryIconProps} />
            </div>
          )}
        </div>
        <ChevronDownIcon
          size="sm"
          className={cx(
            `${baseClassName}__chevron-icon`,
            `text-black t-opacity-background--100 bg-white o-position--absolute t-border-r--circle u-cursor--pointer`,
            {
              [`${baseClassName}__chevron-icon--visible`]: !openedState,
              [`${baseClassName}__chevron-icon--hidden`]: openedState,
            }
          )}
        />
        <Flex
          className={cx(
            `${baseClassName}__close-drawer`,
            "o-position--absolute u-height--3xlg u-width--3xlg",
            "t-border-r--circle u-margin-right--md u-cursor--pointer",
            "text-white o-position--absolute@mobile u-zindex--header",
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
