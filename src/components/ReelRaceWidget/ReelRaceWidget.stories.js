// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockDate from "mockdate";
import { PLAYING_STATE } from "Models/playing";
import { isChromatic } from "Storybook/isNotChromatic";
import { ReelRaceWidget } from "./ReelRaceWidget";

const stories = storiesOf("ReelRaceWidget", module);

if (isChromatic) {
  MockDate.set(new Date().toString());
}

const now = Date.now();
const minute = 60 * 1000;

const props = {
  started: null,
  scheduled: {
    tournamentId: "1",
    color: "yellow-light-1",
    spins: 250,
    minBet: "€0.50",
    prize: "€666",
    gameSlug: "gonzos-quest",
    status: "Scheduled",
    startTime: now + 30 * minute,
    endTime: now + 60 * minute,
    opted: true,
    promoted: false,
  },
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
    jackpot: null,
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
    state: PLAYING_STATE.STARTED,
    gameId: "bar",
  },
  playerId: "123",
  playerSpins: 200,
  gameSlug: "foo",
};

stories.add("Default", () => {
  return (
    <div style={{ width: "300px" }}>
      <ReelRaceWidget {...props} />
    </div>
  );
});
