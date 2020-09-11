// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ChatIcon, ExitIcon } from "@casumo/cmp-icons";

type Props = {
  t: {
    in_game_drawer_live_chat: ?string,
    in_game_drawer_exit_game: ?string,
  },
  isChatDisabled: boolean,
  onLiveChatClick: Function,
  onExitGameClick: Function,
};

export const InGameDrawer = ({
  t,
  isChatDisabled,
  onLiveChatClick,
  onExitGameClick,
}: Props) => {
  return (
    <Flex
      align="stretch"
      justify="space-around"
      className="t-background-grey-90 t-border-r u-height--5xlg u-margin u-width--2/3@tablet u-margin-x--auto@tablet"
    >
      {!isChatDisabled && (
        <Flex.Block
          onClick={onLiveChatClick}
          className="o-layout__item t-color-white o-flex-justify--center o-flex-align--center t-border-grey-70 t-border-right u-padding-right"
        >
          <ChatIcon className="u-margin-right" />
          <Text tag="span" size="sm">
            {t.in_game_drawer_live_chat}
          </Text>
        </Flex.Block>
      )}
      <Flex.Block
        onClick={onExitGameClick}
        className="o-layout__item t-color-white o-flex-justify--center o-flex-align--center u-margin-left--none"
      >
        <ExitIcon className="u-margin-right" />
        <Text tag="span" size="sm">
          {t.in_game_drawer_exit_game}
        </Text>
      </Flex.Block>
    </Flex>
  );
};
