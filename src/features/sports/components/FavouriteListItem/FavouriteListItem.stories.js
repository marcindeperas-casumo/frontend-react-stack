// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import { action } from "@storybook/addon-actions";

import { PlanetIcon } from "@casumo/cmp-icons";

import FavouriteListItem from "./FavouriteListItem";

const stories = storiesOf("Sports/FavouriteListItem", module);

stories.add(
  "Default",
  () => (
    <FavouriteListItem
      icon={<PlanetIcon size="lrg" />}
      label="Test label"
      onClick={action("onClick")}
    />
  ),
  info({ text: "With icon" })
);

stories.add(
  "Favourited",
  () => (
    <FavouriteListItem
      icon={<PlanetIcon size="lrg" />}
      label="Test label"
      onClick={action("onClick")}
      isFavourite={true}
    />
  ),
  info({ text: "Favourited" })
);

stories.add(
  "Not favouritable",
  () => (
    <FavouriteListItem
      icon={<PlanetIcon size="lrg" />}
      label="Test label"
      onClick={action("onClick")}
      isFavouritable={false}
    />
  ),
  info({ text: "Favourited" })
);
