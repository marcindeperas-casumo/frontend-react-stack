// @flow
import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { PlayIcon, MoreIcon } from "@casumo/cmp-icons";
import { stringToHTML, decodeString } from "Utils";
import { EitherOr } from "Components/EitherOr";
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

type Props = {
  gameData: Game,
  promotions_legal_text: string,
  primary_action_text: string,
  onLaunchGame: Function,
};

export class CuratedCardFooter extends PureComponent<Props> {
  renderLegal = () => {
    const { promotions_legal_text } = this.props;

    return (
      <Text
        className="t-color-white u-margin-bottom u-opacity-75"
        size="xs"
        tag="div"
        dangerouslySetInnerHTML={stringToHTML(promotions_legal_text)}
      />
    );
  };

  renderGame = () => {
    const { gameData, primary_action_text, onLaunchGame } = this.props;

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
          <Text
            tag="span"
            size="sm"
            className="u-font-weight-bold t-color-white"
          >
            {decodeString(gameData.name)}
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
                <span className="u-margin-left">{primary_action_text}</span>
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

  render() {
    const { gameData } = this.props;

    return (
      <EitherOr
        either={this.renderLegal}
        or={this.renderGame}
        condition={() => !gameData}
      />
    );
  }
}
