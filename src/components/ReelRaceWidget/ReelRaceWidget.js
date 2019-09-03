// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import bridge from "Src/DurandalReactBridge";
import Timer from "Components/Timer";
import { REACT_APP_EVENT_PLAYING } from "Src/constants";
import type { ReelRace, ReelRacesTranslations } from "Models/reelRaces";
import DangerousHtml from "Components/DangerousHtml";
import "./ReelRaceWidget.scss";

type Props = ReelRace & {
  initReelRacesSaga: () => void,
  isReelRacesFetched: () => void,
  fetchTranslations: () => void,
  launchGame: () => void,
  areTranslationsFetched: boolean,
  game: GameRow_Game,
  t: ReelRacesTranslations,
};

export function ReelRaceWidget(props: Props) {
  const [playing, setPlaying] = React.useState(null);

  function playingGameId({ gameId }) {
    setPlaying(gameId);
  }

  React.useEffect(() => {
    bridge.on(REACT_APP_EVENT_PLAYING, playingGameId);
  });

  React.useEffect(() => {
    if (!props.isReelRacesFetched) {
      props.initReelRacesSaga();
    }
    if (!props.areTranslationsFetched) {
      props.fetchTranslations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!props.endTime) {
    return null;
  }

  const { t, game } = props;

  const started = props.status === "Started";

  return (
    <>
      <Flex direction="vertical" align="center" className="u-padding--md">
        {playing}
        {playing !== props.gameSlug && (
          <Flex direction="vertical" align="center">
            <Flex direction="vertical" spacing="sm">
              <Text tag="span" size="xs" className="u-text-align-center">
                {t.title}
              </Text>
              <Text
                tag="span"
                size="xs"
                className="u-text-align-center u-font-weight-bold"
                onClick={props.launchGame}
              >
                <DangerousHtml html={game.name} />
              </Text>
              <Text
                tag="span"
                className="u-margin-bottom--md u-text-align-center"
              >
                {t.prize_win_tagline &&
                  t.prize_win_tagline.replace("{{{name}}}", props.prize)}
              </Text>
            </Flex>
          </Flex>
        )}
        <Flex direction="vertical" spacing="none">
          <Text
            tag="span"
            className="u-font-weight-bold u-text-align-center t-color-green"
          >
            {props.spins}
          </Text>
          <Text
            tag="span"
            size="xs"
            className="u-opacity-75 u-text-align-center"
          >
            {t.spins}
          </Text>
        </Flex>
        <Flex
          direction="vertical"
          spacing="none"
          className="u-margin-top--md u-margin-x--md u-margin-top--md"
        >
          <Text tag="span" size="xs" className="u-text-align-center">
            {started ? t.ending_in : t.starting_in}
          </Text>
          <Text
            tag="span"
            size="lg"
            className="u-font-weight-bold t-color-yellow u-text-align-center"
          >
            <Timer
              endTime={started ? props.endTime : props.startTime}
              render={state => `${state.minutes}:${state.seconds}`}
              onEnd={() => "00:00"}
            />
          </Text>
        </Flex>
      </Flex>
      <div className="t-border-bottom t-color-grey-light-1 t-border--current-color u-width--1/1" />
    </>
  );
}
