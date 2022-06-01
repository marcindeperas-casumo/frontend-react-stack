import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import DangerousHtml from "Components/DangerousHtml";
import { ProgressBar } from "Components/Progress";
import { isMaxLevel } from "Models/adventure";
import type { Adventurer, AdventureContent } from "Models/adventure";

export type Props = {
  adventurer: Adventurer;
  content: AdventureContent;
};

function AdventureProgressBar(props: Props) {
  const { inBonusMode, level, points, pointsRequiredForNextLevel } =
    props.adventurer;

  const { progression_label_standard, progression_label_bonus } = props.content;

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
          fillerClassNames="bg-grey-0"
          trackClassNames={
            inBonusMode && !isMaxLevel(level, inBonusMode)
              ? "bg-teal-50"
              : "bg-purple-60"
          }
        />
      </Flex.Item>
      <Flex
        justify="space-between"
        className="u-width--full u-font-sm u-padding-x--sm u-padding-top"
      >
        <Text className="text-grey-70" tag="div" size="sm">
          <DangerousHtml
            html={progressionLabel.replace(
              "{{progression}}",
              progressPercentage.toString()
            )}
          />
        </Text>
        <Text className="text-grey-50" tag="div" size="sm">
          {`${points} / ${pointsRequiredForNextLevel}`}
        </Text>
      </Flex>
    </>
  );
}

export default React.memo(AdventureProgressBar);
