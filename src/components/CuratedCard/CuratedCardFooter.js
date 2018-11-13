// @flow
import React, { PureComponent } from "react";

import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { PlayIcon, MoreIcon } from "@casumo/cmp-icons";
import { stringToHTML } from "Utils/index";
import EitherOr from "Components/EitherOr";
import GameThumb from "Components/GameThumb";

export type Game = {|
  logoBackground: string,
  logo: string,
  name: string,
  slug: string,
|};

type Props = {
  gameData: Game,
  legalText: string,
  actionText: string,
  onLaunchGame: Function,
};

export default class CuratedCardFooter extends PureComponent<Props> {
  renderLegal = () => {
    const { legalText } = this.props;

    return (
      <Text
        className="t-color-white u-margin-bottom u-opacity-75"
        size="sm"
        tag="div"
        dangerouslySetInnerHTML={stringToHTML(legalText)}
      />
    );
  };

  renderGame = () => {
    const { gameData, actionText, onLaunchGame } = this.props;

    return (
      <Flex align="center">
        <Flex.Item className="o-flex__item-fixed-size">
          <GameThumb src={gameData.logoBackground} mark={gameData.logo} />
        </Flex.Item>
        <Flex.Block>
          <Text tag="span" className="u-font-weight-bold t-color-white">
            {gameData.name}
          </Text>
        </Flex.Block>
        <Flex.Item>
          <Flex justify="center">
            <Button
              id="gtm-curated-play"
              onClick={onLaunchGame}
              variant="variant-1"
              className="u-pointer-events-initial u-padding-horiz--xlg@phablet u-padding-horiz--2xlg@tablet u-padding-horiz--2xlg@desktop"
            >
              <PlayIcon size="sml" />
              <span className="u-margin-left">{actionText}</span>
            </Button>
            <Button
              id="gtm-curated-more"
              href={`/en/play/${gameData.slug}`}
              variant="outline"
              className="u-pointer-events-initial u-display--none@mobile u-padding u-margin-left--lg"
            >
              <MoreIcon size="med" />
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
