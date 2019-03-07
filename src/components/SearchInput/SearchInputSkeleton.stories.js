// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import SearchInputSkeleton from "Components/SearchInput/SearchInputSkeleton";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("SearchInputSkeleton", module);

if (isNotChromatic) {
  stories.add(
    "Default",
    () => <SearchInputSkeleton />,
    info({ text: "Default" })
  );
}
