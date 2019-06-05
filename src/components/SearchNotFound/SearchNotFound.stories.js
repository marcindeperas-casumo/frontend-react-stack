// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import SearchNotFound from "Components/SearchNotFound/SearchNotFound";
import SearchNotFoundContainer from "Components/SearchNotFound";
import MockStore from "Components/MockStore";

const stories = storiesOf("SearchNotFound", module);
const noResultImage =
  "https://cms.casumo.com/wp-content/uploads/2019/01/search_no_results.svg";

const state = {
  schema: {
    cms: {
      "mobile.games-search": {
        fields: {
          no_results_title: "No results found",
          no_results_image: noResultImage,
        },
      },
    },
  },
};

stories.add("Default (Connected)", () => (
  <MockStore state={state}>
    <SearchNotFoundContainer contentField="no_results_continue_playing" />
  </MockStore>
));

stories.add("Default - Continue Playing", () => (
  <SearchNotFound
    image={noResultImage}
    title="No results found"
    content="Find another game or continue playing <br /> your last played"
    startFetch={() => {}}
  />
));

stories.add("Default - Popular Games", () => (
  <SearchNotFound
    image={noResultImage}
    title="No results found"
    content="Find another game or try something popular"
    startFetch={() => {}}
  />
));
