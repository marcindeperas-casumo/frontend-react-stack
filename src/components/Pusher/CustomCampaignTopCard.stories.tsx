import { storiesOf } from "@storybook/react";
import React from "react";
import { viewports } from "Storybook/viewports";
import MockStore from "Components/MockStore";
import { CustomCampaignTopCard } from "./CustomCampaignTopCard";
import "./CustomCampaignTopCard.scss";

const data = {
  title: "Day 5 of 31 offers",
  description:
    "Casumo’s 31 Days of Xmas. A deposit a day keeps surprises coming your way.",
  onCloseClick: () => null,
  backgroundUrl: "top_card_pink",
};

const stories = storiesOf("CustomCampaignTopCard", module);
["mobile", "desktop"].forEach(viewport => {
  stories.add(
    `Mobile (${viewport})`,
    () => (
      <MockStore>
        <div>
          <CustomCampaignTopCard
            title={data.title}
            description={data.description}
            backgroundUrl={data.backgroundUrl}
          />
        </div>
      </MockStore>
    ),
    viewports[viewport]
  );

  stories.add(
    `Desktop (${viewport})`,
    () => (
      <MockStore>
        <div>
          <CustomCampaignTopCard
            title={data.title}
            description={data.description}
            backgroundUrl={"pink"}
          />
        </div>
      </MockStore>
    ),
    viewports[viewport]
  );
});
