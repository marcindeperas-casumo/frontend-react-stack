// @flow
import React from "react";
import classNames from "classnames";
import Card from "@casumo/cmp-card";
import TrackView from "Components/TrackView";
import TrackClick from "Components/TrackClick";
import { EVENTS } from "Src/constants";
import * as A from "Types/apollo";
import { getIsGame, getLink, getTrackData } from "./CuratedCard.utils";
import { CuratedCardBackground } from "./CuratedCardBackground";
import { CuratedCardFooter } from "./CuratedCardFooter";
import { CuratedCardHeader } from "./CuratedCardHeader";
import "./CuratedCard.scss";

type Props = {
  className?: string,
  curatedCard: A.CuratedCardQuery_curatedCard,
  onLaunchGame: () => void,
};

export const CuratedCard = ({
  className,
  curatedCard,
  onLaunchGame,
}: Props) => {
  const link = getLink(curatedCard);
  const isGame = getIsGame(curatedCard);
  const trackData = getTrackData(curatedCard);

  return (
    <div
      className={classNames(
        "c-curated-card o-ratio o-ratio--curated-card",
        className
      )}
    >
      <TrackView
        eventName={EVENTS.MIXPANEL_CURATED_COMPONENT_VIEWED}
        data={trackData}
      />
      <TrackClick
        eventName={EVENTS.MIXPANEL_CURATED_COMPONENT_CLICKED}
        data={trackData}
      >
        <CuratedCardBackground
          link={link}
          onClick={isGame ? onLaunchGame : null}
          image={curatedCard.image}
          smallImage={curatedCard.smallImage}
          mediumImage={curatedCard.mediumImage}
          largeImage={curatedCard.largeImage}
        />
        <Card
          className="o-ratio__content u-pointer-events-none u-padding--md@mobile u-padding--md@phablet u-padding--lg u-padding-x--3xlg@desktop"
          justify="end"
          spacing={{
            mobile: "md",
            desktop: "5xlg",
            default: "lg",
          }}
          header={() => (
            <CuratedCardHeader
              isGame={isGame}
              header={curatedCard.header}
              subtitle={curatedCard.subtitle}
            />
          )}
          footer={() => (
            <CuratedCardFooter
              isGame={isGame}
              game={curatedCard.game}
              launchButtonText={curatedCard.launchGameText}
              onLaunchGame={onLaunchGame}
              promotionLegalText={curatedCard.promotionLegalText}
            />
          )}
        />
      </TrackClick>
    </div>
  );
};
