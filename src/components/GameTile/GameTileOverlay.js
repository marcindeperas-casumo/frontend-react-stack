import classNames from "classnames";
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { MoreIcon } from "@casumo/cmp-icons";
import { decodeString } from "../../lib/utils";

import PlayAction from "Components/GameTile/PlayAction";
import TemporaryUnavailable from "Components/GameTile/TemporaryUnavailable";

const GameTileOverlay = ({ name, slug, inMaintenanceMode, launchGame }) => {
  return (
    <Flex
      direction="vertical"
      className={classNames(
        "o-ratio__content c-game-tile__overlay",
        inMaintenanceMode && "c-game-tile__overlay--maintenance",
        "u-padding-vert--normal u-padding-horiz--small t-border-r--8"
      )}
    >
      <Text size="sm" className="t-color-white u-text-clamp u-font-weight-bold">
        {decodeString(name)}
      </Text>

      {inMaintenanceMode ? (
        <TemporaryUnavailable />
      ) : (
        <PlayAction launchGame={launchGame} />
      )}

      <a href={`/en/play/${slug}`} onMouseDown={e => e.preventDefault()}>
        <MoreIcon
          size="med"
          className="t-background-white t-color-grey-dark-3 t-border-r--circle u-padding--micro"
        />
      </a>
    </Flex>
  );
};

export default GameTileOverlay;
