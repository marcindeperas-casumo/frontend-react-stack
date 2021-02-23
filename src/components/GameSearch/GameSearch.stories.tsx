// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { GameSearch } from "Components/GameSearch/GameSearch";
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

  const suggestedGamesState = {
    ...defaultState,
    schema: {
      cms: cmsState,
      gameList: {
        suggestedGames: {
          id: "suggestedGames",
          games: ["mega-fortune-dreams", "book-of-dead", "mega-fortune"],
        },
        gameSearch: {
          id: "gameSearch",
          games: ["starburst"],
        },
      },
    },
  };

  const noop = () => ({});

  stories.add("Loading", () => (
    <MockStore state={state}>
      <GameSearch
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ initFetchGameSearchCount: () => {}; clearS... Remove this comment to see the full error message
        initFetchGameSearchCount={noop}
        clearSearch={noop}
        preloadFetchPlayerGames={noop}
        fetchPageBySlug={noop}
        searchResults={[]}
        searchResultsCount={0}
        loading={true}
        inputPromptPlaceholder="What 🐟 are you looking for?"
        query={""}
      />
    </MockStore>
  ));

  stories.add("Not Found - Latest Played Games", () => (
    <MockStore state={latestPlayedGamesState}>
      <GameSearch
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ initFetchGameSearchCount: () => {}; clearS... Remove this comment to see the full error message
        initFetchGameSearchCount={noop}
        clearSearch={noop}
        preloadFetchPlayerGames={noop}
        fetchPageBySlug={noop}
        searchResults={[]}
        searchResultsCount={0}
        loading={false}
        inputPromptPlaceholder="What 🐟 are you looking for?"
        query={"whatever"}
      />
    </MockStore>
  ));

  stories.add("Not Found - Popular Games", () => (
    <MockStore state={state}>
      <GameSearch
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ initFetchGameSearchCount: () => {}; clearS... Remove this comment to see the full error message
        initFetchGameSearchCount={noop}
        clearSearch={noop}
        preloadFetchPlayerGames={noop}
        fetchPageBySlug={noop}
        searchResults={[]}
        searchResultsCount={0}
        loading={false}
        inputPromptPlaceholder="What 🐟 are you looking for?"
        query={"whatever"}
      />
    </MockStore>
  ));

  stories.add("Direct hit - query: starburst", () => (
    <MockStore state={suggestedGamesState}>
      <GameSearch
        initFetchGameSearchCount={noop}
        clearSearch={noop}
        preloadFetchPlayerGames={noop}
        fetchPageBySlug={noop}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'GameSearc... Remove this comment to see the full error message
        searchResults={["starburst"]}
        searchResultsCount={1}
        loading={false}
        inputPromptPlaceholder="What 🐟 are you looking for?"
        query={"starburst"}
      />
    </MockStore>
  ));

  stories.add("Multiple results - query: mega", () => (
    <MockStore state={state}>
      <GameSearch
        initFetchGameSearchCount={noop}
        clearSearch={noop}
        preloadFetchPlayerGames={noop}
        fetchPageBySlug={noop}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'GameSearc... Remove this comment to see the full error message
        searchResults={["mega-fortune", "mega-fortune-dreams"]}
        searchResultsCount={1}
        loading={false}
        inputPromptPlaceholder="What 🐟 are you looking for?"
        query={"mega"}
      />
    </MockStore>
  ));
}
