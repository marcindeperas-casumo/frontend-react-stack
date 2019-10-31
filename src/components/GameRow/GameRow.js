// @flow
import React, { PureComponent } from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { MoreIcon, PlayIcon } from "@casumo/cmp-icons";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { renderBets } from "Utils";
import { GameThumb } from "Components/GameThumb";
import DangerousHtml from "Components/DangerousHtml";
import { GameRowSearchTitle } from "Components/GameRow/GameRowSearchTitle";
import TrackClick from "Components/TrackClick";

type SearchProps = {
  /** The search query */
  query?: string,
  /** Whether highlight the search query on the game title or not  */
  highlightSearchQuery?: boolean,
};

type Props = {
  /** The Game object containing name, logo, logoBackground and slug of the game to be rendered */
  game: GameRow_Game,
  /** The function in charge of launching the game */
  onLaunchGame: () => void,
  /** Class name to apply to the game row */
  className?: string,
  /** The search props */
  search?: SearchProps | boolean,
};

const iconStyle =
  "t-background-chrome-light-1 t-color-chrome-dark-2 t-border-r--circle u-padding";

export const TrackPlayIcon = ({
  name,
  onLaunchGame,
}: {
  name: string,
  onLaunchGame: () => void,
}) => (
  <TrackClick
    eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
    data={{ [EVENT_PROPS.GAME_NAME]: name }}
  >
    <Flex.Item className="o-flex__item--no-shrink" onClick={onLaunchGame}>
      <PlayIcon className={iconStyle} />
    </Flex.Item>
  </TrackClick>
);

export const TrackMoreIcon = ({
  name,
  slug,
}: {
  name: string,
  slug: string,
}) => (
  <Flex.Item className="o-flex__item--no-shrink">
    <TrackClick
      eventName={EVENTS.MIXPANEL_GAME_DETAILS}
      data={{ [EVENT_PROPS.GAME_NAME]: name }}
    >
      <a href={`/en/play/${slug}`}>
        <MoreIcon className={iconStyle} />
      </a>
    </TrackClick>
  </Flex.Item>
);

export const GameRowText = ({ name, bets }: { name: string, bets: Object }) => (
  <Flex.Block className="t-color-grey-dark-3 u-padding-left--sm">
    <Text
      tag="div"
      size="sm"
      className={classNames({ "u-font-weight-bold": bets })}
    >
      <DangerousHtml html={name} />
    </Text>
    <BetsLevels bets={renderBets(bets)} />
  </Flex.Block>
);

export const GameRowSearchText = ({
  name,
  search,
}: {
  name: string,
  search: SearchProps | boolean,
}) => {
  /* eslint-disable fp/no-let, fp/no-mutation */
  let highlightSearchQuery, query;

  if (typeof search === "boolean") {
    highlightSearchQuery = false;
    query = "";
  } else {
    ({ highlightSearchQuery, query } = search);
  }
  /* eslint-enable fp/no-let, fp/no-mutation */

  return (
    <Flex.Block className="u-padding-left--sm t-color-grey-dark-2">
      <GameRowSearchTitle
        highlightSearchQuery={highlightSearchQuery}
        name={name}
        query={query}
      />
    </Flex.Block>
  );
};

export class GameRow extends PureComponent<Props> {
  render() {
    const { game = {}, onLaunchGame, search, className = "" } = this.props;
    const { name, logo, logoBackground, slug } = game;
    const lobby = game.lobby || {};
    const { bets } = lobby;

    return (
      <Flex
        align="center"
        className={classNames({ "u-padding--md": !search }, className)}
      >
        <Flex.Block onClick={onLaunchGame}>
          <TrackClick
            eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
            data={{ [EVENT_PROPS.GAME_NAME]: name }}
          >
            <Flex align="center">
              <Flex.Item className="o-flex__item--no-shrink">
                <GameThumb src={logoBackground} alt={name} mark={logo} />
              </Flex.Item>
              {search ? (
                <GameRowSearchText name={name} search={search} />
              ) : (
                <GameRowText name={name} bets={bets} />
              )}
            </Flex>
          </TrackClick>
        </Flex.Block>
        {game.lobby ? (
          <TrackPlayIcon name={name} onLaunchGame={onLaunchGame} />
        ) : (
          <TrackMoreIcon name={name} slug={slug} />
        )}
      </Flex>
    );
  }
}

function BetsLevels({ bets }) {
  if (bets) {
    return (
      <Text tag="div" size="sm" className="u-padding-top--sm t-color-grey">
        {bets}
      </Text>
    );
  }

  return null;
}
