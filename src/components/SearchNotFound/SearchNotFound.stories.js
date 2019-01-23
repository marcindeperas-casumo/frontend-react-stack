// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import SearchNotFound from "Components/SearchNotFound/SearchNotFound";
import SearchNotFoundContainer from "Components/SearchNotFound";
import MockStore from "Components/MockStore";

const stories = storiesOf("SearchNotFound", module);

stories.add(
  "Default (Connected)",
  () => (
    <MockStore>
      <SearchNotFoundContainer />
    </MockStore>
  ),
  info({ text: "Default (Connected)" })
);

stories.add(
  "Default",
  () => (
    <SearchNotFound
      isFetched={true}
      image={
        "https://cms.casumo.com/wp-content/uploads/2019/01/search_not_found.png"
      }
      title="No results found 🤷🏻‍♂️"
      content="Find another game or continue playing <br /> your last played"
    />
  ),
  info({ text: "Default" })
);
