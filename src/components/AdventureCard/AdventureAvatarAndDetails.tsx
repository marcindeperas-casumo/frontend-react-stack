import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import React from "react";
import DangerousHtml from "Components/DangerousHtml";
import type { Adventurer, AdventureContent } from "Models/adventure";
import { isMaxLevel } from "Models/adventure";
import { CasumoAvatar } from "Components/CasumoAvatar";

export type Props = {
  adventurer: Adventurer;
  content: AdventureContent;
};

function AdventureAvatarAndDetails(props: Props) {
  const { level, inBonusMode, name, belt } = props.adventurer;

  const getLevelLabel = React.useCallback(() => {
    const { max_level_label, level_label, bonus_mode_label } = props.content;

    const bonusModeIndicator = `<strong class="text-purple-5">${bonus_mode_label}</strong>`;
    const maxLevelReached = isMaxLevel(level, inBonusMode);
    const label = maxLevelReached ? max_level_label : level_label;
    const requiresBonusModeIndicator = inBonusMode && !maxLevelReached;

    return requiresBonusModeIndicator
      ? `${label} | ${bonusModeIndicator}`
      : label;
  }, [inBonusMode, level, props.content]);

  const levelLabel = getLevelLabel();

  return (
    <Flex
      align="center"
      className="t-border-r u-overflow--hidden u-width--full u-margin-bottom--lg"
    >
      <Flex.Item className="c-adventure-card__avatar o-flex__item-fixed-size">
        <CasumoAvatar belt={belt} level={level} inBonusMode={inBonusMode} />
      </Flex.Item>
      <Flex.Item className="u-margin-left--md">
        <Text
          tag="div"
          className="u-font-weight-bold text-grey-90 u-margin-bottom--sm"
          size="md"
        >
          <DangerousHtml html={name} />
        </Text>
        <Text tag="div" className="text-grey-50" size="sm">
          <DangerousHtml
            html={levelLabel.replace("{{level}}", level.toString())}
          />
        </Text>
      </Flex.Item>
    </Flex>
  );
}

export default React.memo(AdventureAvatarAndDetails);
