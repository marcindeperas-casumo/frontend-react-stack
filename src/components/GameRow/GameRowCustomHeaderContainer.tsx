import * as React from "react";
import { GameRow } from "Components/GameRow/GameRow";
import { useGameInfo } from "Utils/hooks/useGameInfo";
import { useLaunchGame } from "Utils/nativeBridge";
import { useTranslationsGql } from "Utils/hooks";
import { GameRowCustomHeaderContent } from "./GameRowCustomHeaderContent";

type Props = {
  header: string;
  gameSlug: string;
};

export const GameRowCustomHeaderContainer = (props: Props) => {
  const { header, gameSlug } = props;
  const { gameInfo, loading: gameLoading } = useGameInfo(gameSlug);
  const { t, loading } = useTranslationsGql({
    header,
  });
  const { launchGame } = useLaunchGame(gameInfo?.game);

  if (gameLoading) {
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
