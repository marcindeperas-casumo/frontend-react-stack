// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import GameSearch from "Components/GameSearch/GameSearch";
import defaultState from "Models/__mocks__/state.mock";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";
const stories = storiesOf("GameSearch", module);

if (isNotChromatic) {
  const cmsState = {
    "mobile.games-search": {
      fields: {
        input_prompt: "Have a have a look",
        continue_playing: "Continue 🎣",
        popular_games: "Choose one of the popular ones 🐟🐠🐡",
        no_results_image:
          "https://cms.casumo.com/wp-content/uploads/2019/01/search_no_results.svg",
        no_results_title: "One Pound 🐟 not found",
        no_results_popular:
          "Have a have a look for another 🐟 or choose one of the popular ones 🐟🐠🐡",
        no_results_continue_playing:
          "Have a have a look for another 🐟 or continue 🎣",
      },
    },
  };

  const state = {
    ...defaultState,
    schema: {
      cms: cmsState,
    },
  };

  const latestPlayedGamesState = {
    ...defaultState,
    schema: {
      cms: cmsState,
      gameList: {
        latestPlayedGames: {
          id: "latestPlayedGames",
          games: ["book-of-dead", "mega-fortune", "mega-fortune-dreams"],
        },
      },
    },
  };

  const noop = () => ({});

  stories.add(
    "Loading",
    () => (
      <MockStore state={state}>
        <GameSearch
          clearSearch={noop}
          initFetchQuerySearch={noop}
          inputPromptPlaceholder="What 🐟 are you looking for?"
          preloadFetchPlayerGames={noop}
          query={""}
          searchResults={[]}
          fetchPageBySlug={noop}
          loading={true}
        />
      </MockStore>
    ),
    info({ text: "Loading" })
  );

  stories.add(
    "Not Found - Latest Played Games",
    () => (
      <MockStore state={latestPlayedGamesState}>
        <GameSearch
          clearSearch={noop}
          initFetchQuerySearch={noop}
          inputPromptPlaceholder="What 🐟 are you looking for?"
          preloadFetchPlayerGames={noop}
          query={"whatever"}
          searchResults={[]}
          fetchPageBySlug={noop}
          loading={false}
        />
      </MockStore>
    ),
    info({ text: "Not Found - Latest Played Games" })
  );

  stories.add(
    "Not Found - Popular Games",
    () => (
      <MockStore state={state}>
        <GameSearch
          clearSearch={noop}
          initFetchQuerySearch={noop}
          inputPromptPlaceholder="What 🐟 are you looking for?"
          preloadFetchPlayerGames={noop}
          query={"whatever"}
          searchResults={[]}
          fetchPageBySlug={noop}
          loading={false}
        />
      </MockStore>
    ),
    info({ text: "Not Found - Popular Games" })
  );

  stories.add(
    "Direct hit - query: starburst",
    () => (
      <MockStore state={latestPlayedGamesState}>
        <GameSearch
          inputPromptPlaceholder="What 🐟 are you looking for?"
          searchResults={["starburst"]}
          fetchPageBySlug={noop}
          clearSearch={noop}
          initFetchQuerySearch={noop}
          preloadFetchPlayerGames={noop}
          query={"starburst"}
          loading={false}
        />
      </MockStore>
    ),
    info({ text: "Direct hit" })
  );

  stories.add(
    "Multiple results - query: mega",
    () => (
      <MockStore state={state}>
        <GameSearch
          inputPromptPlaceholder="What 🐟 are you looking for?"
          searchResults={["mega-fortune", "mega-fortune-dreams"]}
          fetchPageBySlug={noop}
          clearSearch={noop}
          initFetchQuerySearch={noop}
          preloadFetchPlayerGames={noop}
          query={"mega"}
          loading={false}
        />
      </MockStore>
    ),
    info({ text: "Multiple results - query: mega" })
  );
}
