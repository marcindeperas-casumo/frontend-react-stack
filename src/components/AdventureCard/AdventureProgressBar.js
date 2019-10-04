// @flow

import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import DangerousHtml from "Components/DangerousHtml";
import { ProgressBar } from "Components/ProgressBar";
import {
  isMaxLevel,
  type Adventurer,
  type AdventureContent,
} from "Models/adventure";

export type Props = {
  adventurer: Adventurer,
  content: AdventureContent,
};

export default class AdventureProgressBar extends PureComponent<Props> {
  render() {
    const {
      inBonusMode,
      level,
      points,
      pointsRequiredForNextLevel,
    } = this.props.adventurer;

    const {
      progression_label_standard,
      progression_label_bonus,
    } = this.props.content;

    const progressPercentage = Math.floor(
      (points / pointsRequiredForNextLevel) * 100
    );

    const progressionLabel = inBonusMode
      ? progression_label_bonus
      : progression_label_standard;

    return (
      <>
        <Flex.Item className="u-width--full u-margin-top--none">
          <ProgressBar
            progress={progressPercentage}
            fillerClassNames="t-background-chrome-light-2"
            trackClassNames={
              inBonusMode && !isMaxLevel(level, inBonusMode)
                ? "t-background-turquoise"
                : "t-background-plum"
            }
          />
        </Flex.Item>
        <Flex
          justify="space-between"
          className="u-width--full u-font-sm u-padding-x--sm u-padding-top"
        >
          <Text className="t-color-chrome-dark-2" tag="div" size="sm">
            <DangerousHtml
              html={progressionLabel.replace(
                "{{progression}}",
                progressPercentage.toString()
              )}
            />
          </Text>
          <Text className="t-color-chrome-dark-1" tag="div" size="sm">
            {`${points} / ${pointsRequiredForNextLevel}`}
          </Text>
        </Flex>
      </>
    );
  }
}
