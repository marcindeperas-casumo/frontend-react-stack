//@flow
import React from "react";
import { storiesOf } from "@storybook/react";
import Text from "@casumo/cmp-text";
import info from "Storybook/storybookInfo";
import ImageLazy from "Components/Image/ImageLazy";
import Media from "./";

const stories = storiesOf("Media", module);

stories.add(
  "Default",
  () => (
    <Media
      renderText={() => (
        <div>
          <Text className="u-margin-bottom--sm u-font-weight-bold">
            Reel Races
          </Text>
          <Text className="u-margin-bottom--none">
            You know they make sense
          </Text>
        </div>
      )}
      renderImage={() => (
        <ImageLazy
          className="u-display--block"
          width={128}
          alt="Reel Races"
          src="https://cms.casumo.com/wp-content/uploads/2018/09/Asset-27Reel-Races.svg"
        />
      )}
    />
  ),
  info({ text: "Default" })
);
