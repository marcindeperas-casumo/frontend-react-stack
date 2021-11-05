import { storiesOf } from "@storybook/react";
import React from "react";
import { viewports } from "Storybook/viewports";
import MockStore from "Components/MockStore";
import { SumoIconContextProvider } from "Components/SumoIcon/SumoIconContext";
import { GAME_CATEGORIES } from "Src/constants";
import { GamePageHeader } from "./GamePageHeader";

const story = () => {
  return (
    <MockStore>
      <SumoIconContextProvider>
        <GamePageHeader gameCategory={GAME_CATEGORIES.SLOT_MACHINE} />
      </SumoIconContextProvider>
    </MockStore>
  );
};

const stories = storiesOf("GamePageHeader", module);

stories.add("Desktop", story, viewports.desktop);
stories.add("Tablet", story, viewports.tablet);
stories.add("Phablet", story, viewports.phablet);
stories.add("Mobile", story, viewports.mobile);
