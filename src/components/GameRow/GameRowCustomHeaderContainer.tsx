import * as React from "react";
import { GameRowCustomHeaderContent } from "./GameRowCustomHeaderContent";
import { GameRow } from "Components/GameRow/GameRow";
import { useGameInfo } from "Utils/hooks/useGameInfo";
import { useLaunchGame } from "Utils/nativeBridge";
import { useTranslationsGql } from "Utils/hooks";

type Props = {
  header: string;
  gameSlug: string;
};

export const GameRowCustomHeaderContainer = (props: Props) => {
  const { header, gameSlug } = props;
  const { gameInfo } = useGameInfo(gameSlug);
  const { t, loading } = useTranslationsGql({
    header,
  });

  const gameRowProps = {
    game: { ...gameInfo.game, gameStudio: '' },
    renderText: () => (
      <GameRowCustomHeaderContent
        firstLine={loading ? "-" : t.header}
        secondLine={gameInfo.game.name}
      />
    ),
    onLaunchGame: () => useLaunchGame(gameInfo.game),
    hideRightSideComponent: true
  };

  return (
    <GameRow {...gameRowProps} />
  );
};
