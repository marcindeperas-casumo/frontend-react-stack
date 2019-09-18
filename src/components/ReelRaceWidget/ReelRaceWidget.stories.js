// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
// import MockDate from "mockdate";
// import { isChromatic } from "Storybook/isNotChromatic";
import { ReelRaceWidget } from "./ReelRaceWidget";

const stories = storiesOf("ReelRaceWidget", module);

const props = {
  started: {
    tournamentId: "1",
    color: "yellow-light-1",
    spins: 666,
    minBet: "€0.50",
    prize: "€666",
    gameSlug: "gonzos-quest",
    status: "Scheduled",
    startTime: 1234,
    endTime: 12345,
    opted: true,
    promoted: false,
  },
  scheduled: null,
  scheduledGame: {
    name: "Gonzo&#8217;s Quest",
    slug: "gonzos-quest",
    logoBackground:
      "https://cms.casumo.com/wp-content/uploads/2014/06/GonzosQuest_Thumb.jpg",
    logo:
      "https://cms.casumo.com/wp-content/uploads/2014/02/GonzosQuest_Logo.png",
    hasPlayForFun: true,
    inMaintenanceMode: false,
    jackpotInfo: null,
    lobby: null,
  },
  t: {
    spins: "Spins",
    duration: "Duration",
    duration_template: "{{{duration}}} min",
    min_bet: "Min Bet",
    starting_in: "Starting in",
    ending_in: "Ending in",
    opt_in: "Opt In",
    opted_in: "Opted In",
    opted_in_cta_single_game_short: "Play",
    compete_for: "Compete for {{prize}}",
    title: "Reel Races",
    caveat_short: "false",
  },
  areTranslationsFetched: true,
  launchGame: () => {},
  fetchTranslations: () => {},
  fetchReelRaces: () => {},
  isReelRacesFetched: () => {},
  subscribeReelRacesUpdates: () => {},
  unsubscribeReelRacesUpdates: () => {},
  playing: {
    state: "STARTED",
    gameId: "foo",
  },
  leaderboard: [],
  playerId: "123",
  playerSpins: 200,
  gameSlug: "foo",
  color: "blue",
};

stories.add("Default", () => {
  return (
    <div>
      <ReelRaceWidget {...props} />
    </div>
  );
});
