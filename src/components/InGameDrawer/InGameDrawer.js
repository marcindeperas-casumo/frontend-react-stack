// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ChatIcon, ExitIcon } from "@casumo/cmp-icons";

type Props = {
  t: {
    in_game_drawer_live_chat: string,
    in_game_drawer_exit_game: string,
  },
  onLiveChatClick: Function,
  onExitGameClick: Function,
};

export const InGameDrawer = ({
  t,
  onLiveChatClick,
  onExitGameClick,
}: Props) => {
  return (
    <Flex
      align="center"
      justify="space-around"
      className="t-background-grey-90 t-border-r u-height--5xlg u-margin u-width--2/3@tablet u-margin-x--auto@tablet"
    >
      <Flex.Item
        onClick={onLiveChatClick}
        className="o-flex--1 u-text-align-center t-color-white"
      >
        <ChatIcon className="u-margin-right" />
        <Text tag="span" size="sm">
          {t.in_game_drawer_live_chat}
        </Text>
      </Flex.Item>
      <Flex.Item
        className="t-background-grey-70"
        style={{ width: 1, height: "100%" }}
      ></Flex.Item>
      <Flex.Item
        onClick={onExitGameClick}
        className="o-flex--1 u-text-align-center t-color-white"
      >
        <ExitIcon className="u-margin-right" />
        <Text tag="span" size="sm">
          {t.in_game_drawer_exit_game}
        </Text>
      </Flex.Item>
    </Flex>
  );
};
