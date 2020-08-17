// @flow
import React from "react";
import { getApolloContext } from "@apollo/react-hooks";
import classNames from "classnames";
import Card from "@casumo/cmp-card";
import TrackView from "Components/TrackView";
import TrackClick from "Components/TrackClick";
import { EVENTS } from "Src/constants";
import * as A from "Types/apollo";
import type {
  NavigateToSportsHashType,
  NavigateByIdType,
} from "Features/sports/utils";
import {
  getIsGame,
  getIsSports,
  getLink,
  getTrackData,
} from "./CuratedCard.utils";
import { CuratedCardBackground } from "./CuratedCardBackground";
import { CuratedCardFooter } from "./CuratedCardFooter";
import { CuratedCardHeader } from "./CuratedCardHeader";
import "./CuratedCard.scss";

type Props = {
  className?: string,
  market: string,
  curatedCard: ?A.CuratedCardQuery_curatedCard,
  onLaunchGame: () => void,
  navigateToSportsHash: (args: NavigateToSportsHashType) => void,
  navigateById: (args: NavigateByIdType) => void,
};

export const CuratedCard = ({
  className,
  curatedCard,
  onLaunchGame,
  market,
  navigateToSportsHash,
  navigateById,
}: Props) => {
  const { client } = React.useContext(getApolloContext());

  if (!curatedCard) {
    return null;
  }

  const link = getLink({ ...curatedCard, market });
  const isGame = getIsGame(curatedCard);
  const isSports = getIsSports(curatedCard);
  const trackData = getTrackData(curatedCard);
  const getOnClickType = () => {
    if (isGame) {
      return onLaunchGame();
    }
    if (isSports) {
      if (curatedCard.sportsRoute === "deposit") {
        return navigateById({ routeId: curatedCard.sportsRoute });
      }
      return navigateToSportsHash({
        client,
        path: curatedCard.sportsRoute,
        trackingLocation: "CuratedCard",
      });
    }
  };

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
          onClick={getOnClickType}
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
