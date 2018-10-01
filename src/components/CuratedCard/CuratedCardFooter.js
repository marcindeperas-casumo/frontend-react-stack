import React, { PureComponent } from "react";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { PlayIcon, MoreIcon } from "@casumo/cmp-icons";
import LazyImage from "Components/LazyImage";

import { emitLaunchGame } from "Components/GameList/GameList";

const GameThumb = ({ src, mark }) => (
  <LazyImage
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

export default class CuratedCardFooter extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <Flex align="center">
        <Flex.Item>
          <GameThumb src={data.game.logoBackground} mark={data.game.logo} />
        </Flex.Item>
        <Flex.Block>
          <Text tag="span" className="u-font-weight-bold t-color-white">
            {data.game.name}
          </Text>
        </Flex.Block>
        <Flex.Item>
          <Flex justify="center">
            <Button
              onClick={emitLaunchGame(data.game.slug)}
              variant="variant-1"
              className="u-padding-horiz--xlg@phablet u-padding-horiz--2xlg@tablet u-padding-horiz--2xlg@desktop"
            >
              <PlayIcon size="sml" />
              <span className="u-margin-left">{data.primaryActionText}</span>
            </Button>
            <a
              href={`/en/play/${data.game.slug}`}
              className="Button-c-button Button-c-button--outline u-padding u-display--none@mobile u-margin-left--lg"
            >
              <MoreIcon size="med" />
            </a>
          </Flex>
        </Flex.Item>
      </Flex>
    );
  }
}
