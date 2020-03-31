// @flow
import React, { useEffect } from "react";
import { storiesOf } from "@storybook/react";
import { GamePageRender } from "Components/GamePage";
import { LayoutPage } from "Components/LayoutPage";
import { BaseGame } from "GameProviders";
import MockStore from "Components/MockStore";

const stories = storiesOf("GamePage", module);

const gameElement = document.createElement("div");
gameElement.style.background = "#888";
gameElement.style.width = "100%";
gameElement.style.height = "100%";
gameElement.innerText = "I'm a game, play me now!";

class StoryBookMockGameModel extends BaseGame {
  get componentProps() {
    return {
      ...super.componentProps,
      id: "storybookGameContainer",
    };
  }

  // emulating real game mounting
  onMount() {
    super.onMount();

    const gameParent = document.getElementById("storybookGameContainer");

    if (gameParent) {
      gameParent.appendChild(gameElement);
    }
  }
}

const gameProviderModel = new StoryBookMockGameModel({
  gameData: {},
  gameRef: {
    current: gameElement,
  },
  language: "en_gb",
  environment: "TEST",
});

const shouldShowSlotControlSystem = true;

stories.add(
  "Game page with default layout",
  () => {
    useEffect(() => {
      if (document.body && document.documentElement) {
        document.documentElement.style.height = "100vh";
        document.body.style.height = "100vh";
      }

      return () => {
        if (document.body && document.documentElement) {
          document.documentElement.style.height = "";
          document.body.style.height = "";
        }
      };
    });

    return (
      <MockStore>
        <LayoutPage>
          {GamePageRender(gameProviderModel, shouldShowSlotControlSystem)}
        </LayoutPage>
      </MockStore>
    );
  },
  {
    decorators: [storyFn => <div style={{ height: "100vh" }}>{storyFn()}</div>],
    noGlobalDecorator: true,
  }
);
