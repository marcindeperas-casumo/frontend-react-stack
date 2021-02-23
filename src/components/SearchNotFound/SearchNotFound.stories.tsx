// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { SearchNotFound } from "Components/SearchNotFound/SearchNotFound";

const stories = storiesOf("SearchNotFound", module);
const noResultImage =
  "https://cms.casumo.com/wp-content/uploads/2019/01/search_no_results.svg";

stories.add("Default - Continue Playing", () => (
  <SearchNotFound
    image={noResultImage}
    title="No results found"
    content="Find another game or continue playing <br /> your last played"
  />
));

stories.add("Default - Popular Games", () => (
  <SearchNotFound
    image={noResultImage}
    title="No results found"
    content="Find another game or try something popular"
  />
));
