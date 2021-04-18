import { storiesOf } from "@storybook/react";
import React from "react";
// import { viewports } from "Storybook/viewports";

const viewports = { mobile: null, desktop: null, tablet: null, phablet: null };
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
