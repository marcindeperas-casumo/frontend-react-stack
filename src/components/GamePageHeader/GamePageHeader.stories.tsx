// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { viewports } from "Storybook/viewports";
import MockStore from "Components/MockStore";
import { SumoIconContextProvider } from "Components/SumoIcon/SumoIconContext";
import { GamePageHeader } from "./GamePageHeader";

const story = () => {
  return (
    <MockStore>
      <SumoIconContextProvider>
        <GamePageHeader />
      </SumoIconContextProvider>
    </MockStore>
  );
};

const stories = storiesOf("GamePageHeader", module);

stories.add("Desktop", story, viewports.desktop);
stories.add("Tablet", story, viewports.tablet);
stories.add("Phablet", story, viewports.phablet);
stories.add("Mobile", story, viewports.mobile);
