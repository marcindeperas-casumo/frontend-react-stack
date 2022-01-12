import { storiesOf } from "@storybook/react";
import * as React from "react";
import MockDate from "mockdate";
import { viewports } from "Storybook/viewports";
import { background } from "Storybook/casumoTheme";
import { createGameTypeExclusion } from "Models/playOkay/gameTypeExclusions/__mocks__/createGameTypeExclusion";
import MockStore from "Components/MockStore";
import { gameTypeExclusionTranslations } from "../__mocks__/gameTypeExclusionTranslations";
import { GameTypeExclusionsFormItemMock } from "../GameTypeExclusionsForm";
import { GameTypeExclusionsCard } from "./GameTypeExclusionsCard";

const stories = storiesOf(
  "Compliance/GameTypeExclusions/GameTypeExclusionsCard",
  module
).addParameters({
  backgrounds: {
    default: "app",
    values: [{ name: "app", value: background.app }],
  },
});

const commonProps = {
  FormItem: GameTypeExclusionsFormItemMock,
  t: gameTypeExclusionTranslations,
  onMobileClickEdit: () => null,
  selectCategory: () => null,
  unselectCategory: () => null,
  cancelUnselectingCategory: () => null,
};

MockDate.set("2021-12-17");

stories.add("Default (desktop), no exclusions", () => {
  return (
    <MockStore>
      <GameTypeExclusionsCard {...commonProps} />
    </MockStore>
  );
});

stories.add("Default (desktop), Slots excluded, pending revocation", () => {
  return (
    <MockStore>
      <GameTypeExclusionsCard
        {...commonProps}
        selectedCategories={[
          createGameTypeExclusion({
            gameType: "SLOTS",
            pendingRevocation: true,
          }),
        ]}
      />
    </MockStore>
  );
});

stories.add("Default (desktop), Slots excluded", () => {
  return (
    <MockStore>
      <GameTypeExclusionsCard
        {...commonProps}
        selectedCategories={[createGameTypeExclusion({ gameType: "SLOTS" })]}
      />
    </MockStore>
  );
});

stories.add(
  "Default (mobile), no exclusions",
  () => {
    return <GameTypeExclusionsCard readonly {...commonProps} />;
  },
  viewports.mobile
);

stories.add(
  "Default (mobile), Slots and Bingo excluded",
  () => {
    return (
      <GameTypeExclusionsCard
        {...commonProps}
        readonly
        selectedCategories={[
          createGameTypeExclusion({ gameType: "SLOTS" }),
          createGameTypeExclusion({ gameType: "BINGO" }),
        ]}
      />
    );
  },
  viewports.mobile
);

stories.add(
  "In edit mode (mobile), no exclusions",
  () => {
    return (
      <MockStore>
        <GameTypeExclusionsCard {...commonProps} />
      </MockStore>
    );
  },
  viewports.mobile
);

stories.add(
  "In edit mode (mobile), Sports excluded",
  () => {
    return (
      <MockStore>
        <GameTypeExclusionsCard
          {...commonProps}
          selectedCategories={[createGameTypeExclusion({ gameType: "SPORTS" })]}
        />
      </MockStore>
    );
  },
  viewports.mobile
);

stories.add(
  "In edit mode (mobile), Sports excluded, pending revocation",
  () => {
    return (
      <MockStore>
        <GameTypeExclusionsCard
          {...commonProps}
          selectedCategories={[
            createGameTypeExclusion({
              gameType: "SPORTS",
              pendingRevocation: true,
            }),
          ]}
        />
      </MockStore>
    );
  },
  viewports.mobile
);
