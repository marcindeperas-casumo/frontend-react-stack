import React from "react";
import GameListSkeleton from "../../components/GameListSkeleton";

const mockSkeleton = [
  { id: "lastPlayedGames", display: "tiles" },
  { id: "popularGames", display: "tiles" },
  { id: "liveCasinoGames", display: "cards" },
  { id: "newGames", display: "tiles" },
  { id: "casumoFavouriteGames", display: "tiles" },
  { id: "casumoJackpotGames", display: "tiles" },
];

export default () => (
  <div>
    {mockSkeleton.map(({ id, display }) => (
      <GameListSkeleton
        key={id}
        itemWidth={display === "cards" ? 345 : 175}
        itemGap={10}
        cornerRadius={8}
        display={display}
        preserveAspectRatio="xMinYMin"
        colorLow="#eff6f6"
        colorHi="#ffffff"
        className="u-padding-top--normal u-padding-top--semi@tablet u-padding-top--semi@desktop
        u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
      />
    ))}
  </div>
);
