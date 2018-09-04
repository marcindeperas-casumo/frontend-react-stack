import { MoreIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import React from "react";
import { decodeString } from "../../lib/utils";
import LazyImage from "../LazyImage";
import PlayAction from "./PlayAction";
import TemporaryUnavailable from "./TemporaryUnavailable";
import JackpotTicker from "../../components/JackpotTicker";

export const jackpotTickerClass =
  "c-jackpot-ticker u-margin-bottom--normal u-padding-horiz--small u-padding-vert";
const GameTile = ({
  logoBackground,
  logo,
  name,
  slug,
  className,
  inMaintenanceMode,
  launchGame,
  jackpotInfo,
}) => (
  <div
    className={classNames(
      className,
      "c-game-tile",
      "o-ratio",
      "o-ratio--game-tile",
      "c-scrollable-game",
      "t-border-r--8",
      "t-color-white",
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

    {jackpotInfo && (
      <div className="o-ratio__content o-flex o-flex-align--end o-flex-justify--center">
        <JackpotTicker {...jackpotInfo} className={jackpotTickerClass} />
      </div>
    )}

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
    </div>
  </div>
);

export default GameTile;
