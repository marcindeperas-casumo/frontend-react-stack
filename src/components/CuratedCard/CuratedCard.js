// @flow
import React, { PureComponent } from "react";
import { replace } from "ramda";
import classNames from "classnames";
import Card from "@casumo/cmp-card";
import TrackView from "Components/TrackView";
import TrackClick from "Components/TrackClick";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import {
  CURATED_TYPE,
  CARD_CLICK_URL,
  prefixCuratedSlug,
} from "Models/curated";
import * as A from "Types/apollo";
import { CuratedCardBackground } from "./CuratedCardBackground";
import { CuratedCardFooter } from "./CuratedCardFooter";
import { CuratedCardHeader } from "./CuratedCardHeader";
import "./CuratedCard.scss";

const getIsGame = ({ type }) => type === CURATED_TYPE.GAME;

const getLink = ({ type, promotionSlug }) => {
  const url = CARD_CLICK_URL[type] || null;

  if (type === CURATED_TYPE.PROMOTION) {
    return replace("#promotionSlug", promotionSlug, url);
  }

  return url;
};

const getTrackData = ({ type, slug }) => ({
  [EVENT_PROPS.CURATED_TYPE]: type,
  [EVENT_PROPS.CURATED_SLUG]: prefixCuratedSlug(slug),
});

type Props = {
  className?: string,
  curatedCard: A.CuratedCardQuery,
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
