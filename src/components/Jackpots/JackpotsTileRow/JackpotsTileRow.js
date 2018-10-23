// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PlayIcon } from "@casumo/cmp-icons";
import ImageLazy from "Components/Image/ImageLazy";
import DangerousHtml from "Components/DangerousHtml";

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
      <div className="u-padding-vert t-border-bottom t-border--current-color t-color-grey-light-2">
        <Flex align="center">
          {/* Image */}
          <Flex.Item>
            <ImageLazy
              className="t-border-r--16 c-jackpots-tile-row-image"
              src={logoBackground}
              mark={logo}
              alt={name}
              dpr={3}
              width="70"
              height="70"
              imgixOpts={{
                w: 70,
                h: 70,
                fit: "crop",
                crop: "top,left",
                markscale: 100,
              }}
            />
          </Flex.Item>

          {/* Text */}
          <Flex.Block className="t-color-grey-dark-3 u-padding-left--sm">
            <JackpotAmount amount={formattedJackpotAmount} />
            <Text tag="div" size="sm">
              <DangerousHtml html={name} />
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

function JackpotAmount({ amount }) {
  if (amount) {
    return (
      <Text
        tag="div"
        size="sm"
        className="u-font-weight-bold t-color-red u-padding-bottom--sm"
      >
        {amount}
      </Text>
    );
  }

  return null;
}
