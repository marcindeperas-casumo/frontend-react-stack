import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import * as React from "react";
import MockStore from "Components/MockStore";
import { SettingsRealityCheck } from "./SettingsRealityCheck";
import { labels } from "./__mocks__/Queries.mock";

const stories = storiesOf("Settings/SettingsRealityCheck", module);
stories.addDecorator(withKnobs);

stories.add("Default", () => (
  <MockStore>
    <SettingsRealityCheck
      jurisdiction="MGA"
      labels={labels}
      onChange={action("onChange")}
      isLoading={boolean("Is loading", false)}
      onSave={action("onSave")}
      interval={10}
      canToggleInterval={boolean("Can toggle interval", true)}
    />
  </MockStore>
));

stories.add("UKGC", () => (
  <MockStore>
    <SettingsRealityCheck
      jurisdiction="UKGC"
      labels={labels}
      onChange={action("onChange")}
      isLoading={boolean("Is loading", false)}
      onSave={action("onSave")}
      interval={10}
    />
  </MockStore>
));
