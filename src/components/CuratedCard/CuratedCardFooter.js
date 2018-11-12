// @flow
import React, { PureComponent } from "react";

import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { PlayIcon, MoreIcon } from "@casumo/cmp-icons";
import ImageLazy from "Components/Image/ImageLazy";
import { stringToHTML } from "Utils/index";
import EitherOr from "Components/EitherOr";

const GameThumb = ({ src, mark }) => (
  <ImageLazy
    className="u-display--block t-border-r--16"
    width="56"
    height="56"
    src={src}
    mark={mark}
    dpr={3}
    imgixOpts={{
      w: 56,
      h: 56,
      fit: "crop",
      crop: "top,left",
      markscale: 100,
    }}
  />
);

export type Game = {|
  logoBackground: string,
  logo: string,
  name: string,
  slug: string,
|};

type Props = {
  game: Game,
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
    const { game, actionText, onLaunchGame } = this.props;

    return (
      <Flex align="center">
        <Flex.Item className="o-flex__item-fixed-size">
          <GameThumb src={game.logoBackground} mark={game.logo} />
        </Flex.Item>
        <Flex.Block>
          <Text tag="span" className="u-font-weight-bold t-color-white">
            {game.name}
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
              href={`/en/play/${game.slug}`}
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
    const { game } = this.props;

    return (
      <EitherOr
        either={this.renderLegal}
        or={this.renderGame}
        condition={() => !Object.keys(game).length}
      />
    );
  }
}
