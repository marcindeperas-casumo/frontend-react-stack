import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import Lazy from "Components/Lazy";
import MockStore from "Components/MockStore";

const stories = storiesOf("Lazy", module);

stories.add(
  "Lazy",
  () => (
    <>
      <MockStore>
        <Lazy
          loader={() => import("Components/GameList")}
          props={{ id: "popularGames" }}
        />
      </MockStore>
    </>
  ),
  info({
    text: `Lazy loads a component - the component code is split into a separate bundle and
    is not downloaded by the client until the component is actually rendered. All the props
    except "loader" and "fallback" will be passed down to the loaded component.`,
  })
);
