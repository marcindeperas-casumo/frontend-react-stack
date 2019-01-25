// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import SearchNotFound from "Components/SearchNotFound/SearchNotFound";
import SearchNotFoundContainer from "Components/SearchNotFound";
import MockStore from "Components/MockStore";

const stories = storiesOf("SearchNotFound", module);
const state = {
  schema: {
    cms: {
      "mobile.games-search": {
        fields: {
          no_results_title: "No results found",
          no_results_continue_playing:
            "Find another game or continue playing your last played games",
          no_results_image:
            "https://cms.casumo.com/wp-content/uploads/2019/01/search_no_results.svg",
        },
      },
    },
  },
};

stories.add(
  "Default (Connected)",
  () => (
    <MockStore state={state}>
      <SearchNotFoundContainer contentField="no_results_continue_playing" />
    </MockStore>
  ),
  info({ text: "Default (Connected)" })
);

stories.add(
  "Default",
  () => (
    <SearchNotFound
      image={
        "https://cms.casumo.com/wp-content/uploads/2019/01/search_no_results.svg"
      }
      title="No results found 🤷🏻‍♂️"
      content="Find another game or continue playing <br /> your last played"
      startFetch={() => {}}
    />
  ),
  info({ text: "Default" })
);
