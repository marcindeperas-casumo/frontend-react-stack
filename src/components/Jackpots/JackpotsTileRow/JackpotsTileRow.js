// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PlayIcon } from "@casumo/cmp-icons";
import ImageLazy from "Components/Image/ImageLazy";
import Html from "Components/Html";

type Props = {
  game: Object,
  launchGame: ({ slug: string }) => void,
};

export default class JackpotsTileRow extends PureComponent<Props> {
  render() {
    const { game = {}, launchGame } = this.props;
    const { slug, name, logo, logoBackground } = game;
    const { jackpotInfo = {} } = game;
    const { formattedJackpotAmount } = jackpotInfo;

    return (
      <div className="c-jackpots-tile-row t-border-bottom t-border--current-color t-color-grey-light-2">
        <Flex align="center">
          {/* Image */}
          <Flex.Item>
            <ImageLazy
              className="t-border-r--16 c-jackpots-tile-row-image"
              src={logoBackground}
              mark={logo}
              alt={name}
              dpr={3}
            />
          </Flex.Item>

          {/* Text */}
          <Flex.Block className="t-color-grey-dark-3 u-padding-left--sm">
            <Text
              tag="div"
              size="sm"
              className="u-font-weight-bold t-color-red u-padding-bottom--sm"
            >
              {formattedJackpotAmount}
            </Text>
            <Text tag="div" size="sm">
              <Html html={name} />
            </Text>
          </Flex.Block>

          {/* Play Icon */}
          <Flex.Item>
            <PlayIcon
              size="med"
              className="t-background-white t-color-grey-light-1 t-border-r--circle u-padding--md"
              onClick={() => launchGame({ slug })}
            />
          </Flex.Item>
        </Flex>
      </div>
    );
  }
}
