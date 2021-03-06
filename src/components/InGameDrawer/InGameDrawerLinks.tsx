import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ChatIcon, ExitIcon } from "@casumo/cmp-icons";
import cx from "classnames";
import React from "react";
import { Desktop } from "Components/ResponsiveLayout";
import { FullscreenToggle } from "Components/FullscreenView";

type Translations = {
  in_game_drawer_live_chat: string | undefined;
  in_game_drawer_exit_game: string | undefined;
};

type Props = {
  isChatDisabled: boolean;
  onLiveChatClick: () => void;
  onExitGameClick: () => void;
  showLabels?: boolean;
  className?: string;
  t: Translations;
};

export const InGameDrawerLinks = ({
  showLabels = true,
  isChatDisabled,
  onLiveChatClick,
  onExitGameClick,
  className = "",
  t,
}: Props) => {
  return (
    <Flex
      align="stretch"
      justify="space-around"
      className={cx("c-in-game-drawer", className)}
      spacing="none"
    >
      {!isChatDisabled && (
        <Flex.Block
          onClick={onLiveChatClick}
          className="text-white o-flex-justify--center o-flex-align--center border-grey-70 t-border-right u-padding-x--lg u-cursor--pointer"
        >
          <ChatIcon
            className={cx({
              "u-margin-right": showLabels,
            })}
          />
          {showLabels && (
            <Text tag="span" size="sm">
              {t.in_game_drawer_live_chat}
            </Text>
          )}
        </Flex.Block>
      )}
      <Desktop>
        <Flex.Block className="text-white o-flex-justify--center o-flex-align--center border-grey-70 t-border-right u-padding-x--lg u-cursor--pointer">
          <FullscreenToggle />
        </Flex.Block>
      </Desktop>
      <Flex.Block
        onClick={onExitGameClick}
        className="text-white o-flex-justify--center o-flex-align--center u-margin-left--none u-cursor--pointer u-padding-x--lg"
      >
        <ExitIcon
          className={cx({
            "u-margin-right": showLabels,
          })}
        />
        {showLabels && (
          <Text tag="span" size="sm">
            {t.in_game_drawer_exit_game}
          </Text>
        )}
      </Flex.Block>
    </Flex>
  );
};
