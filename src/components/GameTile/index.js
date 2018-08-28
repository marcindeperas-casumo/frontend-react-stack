import Text from "@casumo/cmp-text";
import { MoreIcon, AlertIcon } from "@casumo/cmp-icons";
import classNames from "classnames";
import React from "react";
import { decodeString } from "../../lib/utils";
import LazyImage from "../LazyImage";
import PlayAction from "./PlayAction";
import JackpotTicker from "../../containers/JackpotTickerContainer";

const GameTile = ({
  logoBackground,
  logo,
  name,
  slug,
  className,
  inMaintenanceMode,
  launchGame,
  jackpotId,
}) => (
  <div
    className={classNames(
      className,
      "c-game-tile",
      "o-ratio",
      "o-ratio--game-tile",
      "c-scrollable-game",
      "t-border-r--8",
      inMaintenanceMode && "t-greyscale"
    )}
    tabIndex={0}
  >
    <LazyImage
      className="o-ratio__content t-border-r--8"
      src={logoBackground}
      mark={logo}
      alt={name}
      dpr={3}
    />
    <div className="o-ratio__content o-flex o-flex--align-center o-flex--justify-center">
      <JackpotTicker gameId={jackpotId} />
    </div>
    <div
      className={classNames(
        "flex-vertical",
        "o-ratio__content",
        "c-game-tile__overlay",
        inMaintenanceMode && "c-game-tile__overlay--maintenance",
        "u-padding-vert--normal",
        "u-padding-horiz--small",
        "t-border-r--8"
      )}
    >
      <Text size="sm" className="t-color-white u-text-clamp">
        {decodeString(name)}
      </Text>

      {inMaintenanceMode ? (
        <AlertIcon className="t-color-white" size="med" />
      ) : (
        <PlayAction launchGame={launchGame} />
      )}

      <a href={`/en/play/${slug}`} onMouseDown={e => e.preventDefault()}>
        <MoreIcon
          size="med"
          className="t-background-white t-color-grey-dark-3 t-border-r--circle u-padding--micro"
        />
      </a>
    </div>
  </div>
);

export default GameTile;
