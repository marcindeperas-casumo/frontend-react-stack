// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import type { ReelRacesTranslations } from "Models/reelRaces";
import { ROUTE_IDS } from "Src/constants";
import * as A from "Types/apollo";
import DangerousHtml from "Components/DangerousHtml";
import { interpolate } from "Utils";
import { GameThumb } from "Components/GameThumb";
import GrandReelRaceBadge from "Components/ReelRaceCard/GrandReelRaceBadge.svg";
import "./ReelRaceWidget.scss";
import { useCrossCodebaseNavigation } from "Utils/hooks";

type Props = A.ReelRaceWidgetQuery_reelRaces & {
  t: ReelRacesTranslations,
};

export function ReelRaceWidgetHeader({ t, ...props }: Props) {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const competeForText = interpolate(t.compete_for, {
    prize: props.formattedPrize,
  });

  return (
    <Flex
      align="center"
      className="u-padding--md u-cursor-pointer u-position-relative"
      onClick={() => navigateToKO(ROUTE_IDS.PLAY, { slug: props.game.slug })}
    >
      <GameThumb
        src={props.game.backgroundImage}
        alt={props.game.name}
        mark={props.game.logo}
      />
      {props.promoted && <GrandReelRaceBadge className="c-reel-race__badge" />}
      <Flex direction="vertical" spacing="sm" className="u-margin-left--md">
        <Text tag="span" className="u-margin-bottom--sm u-font-weight-bold">
          {competeForText}
        </Text>
        <Text tag="span" size="xs">
          <DangerousHtml html={props.game.name} />
        </Text>
      </Flex>
    </Flex>
  );
}
