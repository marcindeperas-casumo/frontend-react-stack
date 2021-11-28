import * as React from "react";
import { GameRow } from "Components/GameRow/GameRow";
import { useGameInfo } from "Utils/hooks/useGameInfo";
import { useLaunchGame } from "Utils/nativeBridge";
import { useTranslationsGql } from "Utils/hooks";
import { GameRowSkeleton } from "Components/GameRowSkeleton";
import { GameRowCustomHeaderContent } from "./GameRowCustomHeaderContent";

type Props = {
  header: string;
  gameSlug: string;
  showLoader?: boolean;
};

export const GameRowCustomHeaderContainer = (props: Props) => {
  const { header, gameSlug, showLoader = false } = props;
  const { gameInfo, loading: gameLoading } = useGameInfo(gameSlug);
  const { t, loading } = useTranslationsGql({
    header,
  });
  const { launchGame } = useLaunchGame(gameInfo?.game);

  // Show loader use case for seasonal custom campaign showing game of the day
  if (showLoader && gameLoading) {
    return (
      <div style={{ height: "85px" }}>
        <GameRowSkeleton />
      </div>
    );
  }

  if (gameLoading || !gameInfo?.game) {
    return null;
  }

  const gameRowProps = {
    game: { ...gameInfo.game, gameStudio: "" },
    renderText: () => (
      <GameRowCustomHeaderContent
        primaryText={loading ? "" : t.header}
        secondaryText={gameInfo.game.name}
      />
    ),
    onLaunchGame: launchGame,
    hideRightSideComponent: true,
  };

  return <GameRow {...gameRowProps} />;
};
