import { storiesOf } from "@storybook/react";
import React from "react";
import MockStore from "Components/MockStore";
import { CustomCampaignCTAButtons } from "./CustomCampaignCTAButtons";

const stories = storiesOf("CustomCampaignCTAButtons", module);

const data = {
  Button1Link: "cash/deposit",
  Button1Text: "Learn more",
  Button2Link: "cash/deposit",
  Button2Text: "Deposit",
  onCTAClick: () => null,
};

stories.add("Default (Presentational)", () => (
  <MockStore>
    <div>
      <CustomCampaignCTAButtons
        Button1Link={data.Button1Link}
        Button1Text={data.Button1Text}
        Button2Link={data.Button2Link}
        Button2Text={data.Button2Text}
        onCTAClick={data.onCTAClick}
      />
    </div>
  </MockStore>
));
