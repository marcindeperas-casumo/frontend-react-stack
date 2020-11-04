// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ProgressBar } from "Components/Progress";
import AvatarIcon from "Components/ProfileIcon/icons/profileAvatar.svg";

type Props = {
  level: number,
  points: number,
  pointsRequiredForNextLevel: number,
  progressPercentage: number,
};

export const InGameAdventureWidget = ({
  level,
  points,
  pointsRequiredForNextLevel,
  progressPercentage,
}: Props) => (
  <div className="t-background-grey-90 t-border-r u-padding-x--md u-padding-y--md">
    <Flex align="center">
      <Flex.Item>
        <AvatarIcon />
      </Flex.Item>
      <Flex.Block>
        <ProgressBar
          progress={progressPercentage}
          fillerClassNames="t-background-grey-70 u-padding--none"
          trackClassNames="t-background-teal-50"
        />
        <Flex
          justify="space-between"
          className="u-width--full u-font-sm u-padding-top--sm"
        >
          <Text className="t-color-grey-20" tag="div" size="xs">
            {points}
          </Text>
          <Text className="t-color-grey-50" tag="div" size="xs">
            {pointsRequiredForNextLevel}
          </Text>
        </Flex>
      </Flex.Block>
      <Flex.Item className="u-text-align-center u-font-weight-bold u-margin-bottom--sm u-margin-left--md">
        <Text className="t-color-grey-20 u-line-height--1" tag="div">
          {level}
        </Text>
        <Text className="t-color-grey-20" tag="div" size="2xs">
          LVL
        </Text>
      </Flex.Item>
    </Flex>
  </div>
);
