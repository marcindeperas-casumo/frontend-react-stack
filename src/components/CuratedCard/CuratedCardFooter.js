// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { PlayIcon, MoreIcon } from "@casumo/cmp-icons";
import { stringToHTML, convertHTMLToString } from "Utils";
import { Mobile, Desktop } from "Components/ResponsiveLayout";
import { GameThumb } from "Components/GameThumb";
import TrackClick from "Components/TrackClick";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { CURATED_TYPE } from "Models/curated";

export type Game = {|
  logoBackground: string,
  logo: string,
  name: string,
  slug: string,
|};

type PromotionProps = {
  text: string,
};

type GameProps = {
  gameData: Game,
  buttonText: string,
  onLaunchGame: Function,
};

export const CuratedCardFooterText = ({ text }: PromotionProps) => {
  return (
    <Text
      className="t-color-white u-margin-bottom u-opacity-75"
      size="xs"
      tag="div"
      dangerouslySetInnerHTML={stringToHTML(text)}
    />
  );
};

export const CuratedCardFooterGame = ({
  gameData,
  buttonText,
  onLaunchGame,
}: GameProps) => (
  <>
    <Mobile>
      <CuratedCardFooterGameMobile
        gameData={gameData}
        buttonText={buttonText}
        onLaunchGame={onLaunchGame}
      />
    </Mobile>
    <Desktop>
      <CuratedCardFooterGameDesktop
        gameData={gameData}
        buttonText={buttonText}
        onLaunchGame={onLaunchGame}
      />
    </Desktop>
  </>
);

export const CuratedCardFooterGameMobile = ({
  gameData,
  buttonText,
  onLaunchGame,
}: GameProps) => {
  const trackClickGamePlayData = {
    [EVENT_PROPS.CURATED_TYPE]: CURATED_TYPE.GAME,
    [EVENT_PROPS.CURATED_SLUG]: gameData.slug,
  };

  return (
    <Flex align="center">
      <Flex.Item className="o-flex__item--no-shrink">
        <GameThumb src={gameData.logoBackground} mark={gameData.logo} />
      </Flex.Item>
      <Flex.Block>
        <Text tag="span" size="sm" className="u-font-weight-bold t-color-white">
          {convertHTMLToString(gameData.name)}
        </Text>
      </Flex.Block>
      <Flex.Item>
        <Flex justify="center">
          <TrackClick
            eventName={EVENTS.MIXPANEL_CURATED_COMPONENT_CLICKED}
            data={trackClickGamePlayData}
          >
            <Button
              id="gtm-curated-play"
              onClick={onLaunchGame}
              variant="variant-1"
              className="u-pointer-events-initial u-padding-x--xlg@phablet u-padding-x--3xlg@tablet u-padding-x--3xlg@desktop"
            >
              <PlayIcon size="sm" />
              <span className="u-margin-left">{buttonText}</span>
            </Button>
          </TrackClick>
          <Button
            id="gtm-curated-more"
            href={`/en/play/${gameData.slug}`}
            variant="outline"
            className="u-pointer-events-initial u-display--none@mobile u-padding u-margin-left--lg"
          >
            <MoreIcon />
          </Button>
        </Flex>
      </Flex.Item>
    </Flex>
  );
};

export const CuratedCardFooterGameDesktop = ({
  gameData,
  buttonText,
  onLaunchGame,
}: GameProps) => {
  const trackClickGamePlayData = {
    [EVENT_PROPS.CURATED_TYPE]: CURATED_TYPE.GAME,
    [EVENT_PROPS.CURATED_SLUG]: gameData.slug,
  };

  return (
    <div className="o-wrapper">
      <div className="u-width--2/3">
        <Flex align="center">
          <Flex.Item className="o-flex__item--no-shrink">
            <GameThumb
              width={80}
              height={80}
              src={gameData.logoBackground}
              mark={gameData.logo}
            />
          </Flex.Item>
          <Flex.Block>
            <Text tag="span" className="u-font-weight-bold t-color-white">
              {convertHTMLToString(gameData.name)}
            </Text>
          </Flex.Block>
          <Flex.Item>
            <Flex justify="center">
              <TrackClick
                eventName={EVENTS.MIXPANEL_CURATED_COMPONENT_CLICKED}
                data={trackClickGamePlayData}
              >
                <Button
                  id="gtm-curated-play"
                  onClick={onLaunchGame}
                  variant="variant-1"
                  className="u-pointer-events-initial u-padding-x--xlg@phablet u-padding-x--3xlg@tablet u-padding-x--3xlg@desktop u-padding-y--md@desktop"
                >
                  <PlayIcon />
                  <span className="u-margin-left">{buttonText}</span>
                </Button>
              </TrackClick>
              <Button
                id="gtm-curated-more"
                href={`/en/play/${gameData.slug}`}
                variant="outline"
                className="u-pointer-events-initial u-display--none@mobile u-padding u-padding--md@desktop u-margin-left--lg"
              >
                <MoreIcon />
              </Button>
            </Flex>
          </Flex.Item>
        </Flex>
      </div>
    </div>
  );
};
