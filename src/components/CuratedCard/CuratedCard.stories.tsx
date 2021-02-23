// @flow
import { storiesOf } from "@storybook/react";
import { text, select } from "@storybook/addon-knobs/react";
import React from "react";
import { CuratedCard } from "./CuratedCard";
import { curatedGameMock, curatedPromotionMock } from "./__mocks__";

const stories = storiesOf("CuratedCard", module);

stories.add("Game", () => {
  return <CuratedCard curatedCard={curatedGameMock} />;
});

stories.add("Promotion", () => {
  return <CuratedCard curatedCard={curatedPromotionMock} />;
});

stories.add(
  "Content Previewer",
  () => {
    const slug = "slug";
    const type = select(
      "Type of Curated Card",
      ["promotion", "game", "welcome offer"],
      "game",
      "Card Type"
    );
    const header = text("Title Text", "TRY OUR <br> NEW <br>GAME", "Text");
    const subtitle = text("Subtitle Text", "The Subtitle", "Text");
    const promotionLegalText = text(
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
    const launchGameText = text("Play Button Text", "Play", "Game Info");
    const game = {
      name: text("Game Name", "Tiki Tumble", "Game Info"),
      slug: "tiki-tumble",
      backgroundImage: text(
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

    return (
      <CuratedCard
        curatedCard={{
          slug,
          type,
          header,
          subtitle,
          image: null,
          smallImage,
          mediumImage,
          largeImage,
          promotionSlug: null,
          promotionLegalText,
          launchGameText,
          game,
        }}
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
    const slug = "slug";
    const type = select(
      "Type of Curated Card",
      ["promotion", "game", "welcome offer"],
      "game",
      "Card Type"
    );
    const header = text("Title Text", "TRY OUR <br> NEW <br>GAME", "Text");
    const subtitle = text("Subtitle Text", "The Subtitle", "Text");
    const promotionLegalText = text(
      "Legal Text",
      "Nulla aliquam dictum quam, ut euismod est ornare ac. Phasellus et ipsum sed neque sodales sollicitudin. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
      "Text"
    );
    const image = text(
      "Image",
      "https://cms.casumo.com/wp-content/uploads/2019/07/artwork-V1.2.png",
      "Card Background"
    );
    const launchGameText = text("Play Button Text", "Play", "Game Info");
    const game = {
      name: text("Game Name", "Tiki Tumble", "Game Info"),
      slug: "tiki-tumble",
      backgroundImage: text(
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

    return (
      <CuratedCard
        curatedCard={{
          slug,
          type,
          header,
          subtitle,
          image,
          smallImage: null,
          mediumImage: null,
          largeImage: null,
          promotionSlug: null,
          promotionLegalText,
          launchGameText,
          game,
        }}
      />
    );
  },
  {
    knobs: {
      escapeHTML: false,
    },
  }
);
