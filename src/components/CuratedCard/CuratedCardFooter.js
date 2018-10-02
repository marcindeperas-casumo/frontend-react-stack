// @flow
import React, { PureComponent } from "react";

import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { PlayIcon, MoreIcon } from "@casumo/cmp-icons";
import LazyImage from "Components/LazyImage";

import { emitLaunchGame } from "Components/GameList/GameList";

export type Game = {|
  logoBackground: string,
  logo: string,
  name: string,
  slug: string,
|};

type Props = {|
  game: Game,
|};

export default class CuratedCardFooter extends PureComponent<Props> {
  render() {
    const { game } = this.props;

    return (
      <Flex align="center">
        <Flex.Item>
          <LazyImage
            className="t-border-r--16"
            width="60"
            height="60"
            src={game.logoBackground}
            mark={game.logo}
            imgixOpts={{ w: 60 }}
          />
        </Flex.Item>
        <Flex.Block>
          <Text tag="span" className="u-font-weight-bold t-color-white">
            {game.name}
          </Text>
        </Flex.Block>
        <Flex.Item>
          <Flex justify="center">
            <Button
              onClick={() => emitLaunchGame(game.slug)}
              variant="variant-1"
              className="u-padding-horiz--xlg@phablet u-padding-horiz--2xlg@tablet u-padding-horiz--2xlg@desktop"
            >
              <PlayIcon size="med" />
            </Button>
            <a
              href={`/en/play/${game.slug}`}
              className="u-display--none@mobile u-margin-left--lg"
            >
              <MoreIcon
                size="med"
                className="t-color-white t-border t-border-r--circle u-padding"
              />
            </a>
          </Flex>
        </Flex.Item>
      </Flex>
    );
  }
}
