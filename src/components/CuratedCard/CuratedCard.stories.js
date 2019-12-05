// @flow
import { storiesOf } from "@storybook/react";
import { text, select } from "@storybook/addon-knobs/react";
import { T, F } from "ramda";
import React from "react";
import { CuratedCard } from "Components/CuratedCard";
import { CuratedCard as CuratedCardPresentational } from "Components/CuratedCard/CuratedCard";
import MockStore from "Components/MockStore";
import { getStateMock } from "Models/__mocks__/state.mock";
import curated from "Models/curated/__mocks__/curated.json";
import curatedWelcome from "Models/curated/__mocks__/curated.welcome.json";

const stories = storiesOf("CuratedCard", module);
const firstDepositDate = 1514764800000;

const state = {
  ...getStateMock({ firstDepositDate }),
  schema: {
    cms: {
      "curated.curated-game-gb_en": {
        fields: curated,
      },
      "curated.welcome-offer-test": {
        fields: curatedWelcome,
      },
    },
  },
};

stories.add("Default", () => {
  return (
    <MockStore state={state}>
      <CuratedCard slug={"curated-game-gb_en"} />
    </MockStore>
  );
});

stories.add("Promotion", () => {
  return (
    <MockStore state={state}>
      <CuratedCard slug={"curated-gb_en"} />
    </MockStore>
  );
});

stories.add("Welcome offer", () => {
  return (
    <MockStore state={state}>
      <CuratedCard slug={"welcome-offer-test"} />
    </MockStore>
  );
});

stories.add(
  "Content Previewer",
  () => {
    const typeOfCurated = select(
      "Type of Curated Card",
      ["promotion", "game", "welcome offer"],
      "game",
      "Card Type"
    );
    const headerTxt = text("Title Text", "TRY OUR <br> NEW <br>GAME", "Text");
    const subtitle = text("Subtitle Text", "The Subtitle", "Text");
    const legalText = text(
      "Legal Text",
      "Nulla aliquam dictum quam, ut euismod est ornare ac. Phasellus et ipsum sed neque sodales sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      "Text"
    );

    const smallImage = text(
      "Mobile (Small)",
      "https://cms.casumo.com/wp-content/uploads/2019/03/push-curated_component-mobile.png",
      "Card Backgrounds"
    );
    const mediumImage = text(
      "Table (Medium)",
      "https://cms.casumo.com/wp-content/uploads/2019/03/push-curated_component-tablet.png",
      "Card Backgrounds"
    );
    const largeImage = text(
      "Desktop (Large)",
      "https://cms.casumo.com/wp-content/uploads/2019/03/push-curated_component-desktop.png",
      "Card Backgrounds"
    );

    const gameData = {
      name: text("Game Name", "Tiki Tumble", "Game Info"),
      slug: "tiki-tumble",
      logoBackground: text(
        "Game Background",
        "https://cms.casumo.com/wp-content/uploads/2018/02/tiki_tumble_thumbnail.jpg",
        "Game Info"
      ),
      logo: text(
        "Game Logo",
        "https://cms.casumo.com/wp-content/uploads/2018/02/tiki_tumble_logo.png",
        "Game Info"
      ),
    };
    const btnTxt = text("Play Button Text", "Play", "Game Info");

    const promotion = [""];
    const slug = "";

    return (
      <CuratedCardPresentational
        typeOfCurated={typeOfCurated}
        slug={slug}
        promotion={promotion}
        game=""
        header={headerTxt}
        subtitle={subtitle}
        fetchCurated={T}
        onLaunchGame={F}
        isFetched={true}
        gameData={typeOfCurated === "game" ? gameData : null}
        small_image={smallImage}
        medium_image={mediumImage}
        large_image={largeImage}
        primary_action_text={btnTxt}
        promotions_legal_text={legalText}
      />
    );
  },
  {
    knobs: {
      escapeHTML: false,
    },
  }
);

stories.add(
  "Content Previewer - Single Image",
  () => {
    const typeOfCurated = select(
      "Type of Curated Card",
      ["promotion", "game", "welcome offer"],
      "game",
      "Card Type"
    );
    const headerTxt = text("Title Text", "TRY OUR <br> NEW <br>GAME", "Text");
    const subtitle = text("Subtitle Text", "The Subtitle", "Text");
    const legalText = text(
      "Legal Text",
      "Nulla aliquam dictum quam, ut euismod est ornare ac. Phasellus et ipsum sed neque sodales sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      "Text"
    );

    const image = text(
      "Image",
      "https://cms.casumo.com/wp-content/uploads/2019/07/artwork-V1.2.png",
      "Card Background"
    );

    const gameData = {
      name: text("Game Name", "Tiki Tumble", "Game Info"),
      slug: "tiki-tumble",
      logoBackground: text(
        "Game Background",
        "https://cms.casumo.com/wp-content/uploads/2018/02/tiki_tumble_thumbnail.jpg",
        "Game Info"
      ),
      logo: text(
        "Game Logo",
        "https://cms.casumo.com/wp-content/uploads/2018/02/tiki_tumble_logo.png",
        "Game Info"
      ),
    };
    const btnTxt = text("Play Button Text", "Play", "Game Info");

    const promotion = [""];
    const slug = "";

    return (
      <CuratedCardPresentational
        typeOfCurated={typeOfCurated}
        slug={slug}
        promotion={promotion}
        game=""
        header={headerTxt}
        subtitle={subtitle}
        fetchCurated={T}
        onLaunchGame={F}
        isFetched={true}
        gameData={typeOfCurated === "game" ? gameData : null}
        image={image}
        primary_action_text={btnTxt}
        promotions_legal_text={legalText}
      />
    );
  },
  {
    knobs: {
      escapeHTML: false,
    },
  }
);
