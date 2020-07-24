import React from "react";
import { shallow } from "enzyme";
import Text from "@casumo/cmp-text";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import ImageLazy from "Components/Image/ImageLazy";
import { GameDetails } from "./GameDetails";
import { GameDetailsButtons } from "./GameDetailsButtons";
import { GameDetailsImage } from "./GameDetailsImage";
import { GameDetailsMedia } from "./GameDetailsMedia";
import {
  gameDetails,
  gameDetailsInMaintenance,
  t,
} from "./__mocks__/gameDetailsMock";

describe("GameDetailsMedia", () => {
  test("should return null unknown media types", () => {
    const rendered = shallow(
      <GameDetailsMedia
        media={[
          {
            type: "video",
            path: "/my/cool/video.mp4",
          },
        ]}
      />
    );
    expect(rendered.equals(null)).toBe(true);
  });

  test("should return ImageLazy for each image", () => {
    const rendered = shallow(
      <GameDetailsMedia
        media={[
          {
            type: "image",
            path: "/my/best/cat.gif",
          },
          {
            type: "image",
            path: "/my/favourite/dog.jpg",
          },
        ]}
      />
    );
    expect(rendered.find(ImageLazy).length).toBe(2);
  });
});

describe("GameDetailsButtons", () => {
  const props = {
    slug: "slug",
    playButtonText: "play",
    practiceButtonText: "practice",
  };
  test("should display play and practice buttons if hasPlayForFun", () => {
    const rendered = shallow(
      <GameDetailsButtons {...props} hasPlayForFun={true} />
    );
    expect(rendered.find(ButtonPrimary).length).toBe(1);
    expect(rendered.find(ButtonSecondary).length).toBe(1);
  });

  test("should only display play button if not hasPlayForFun", () => {
    const rendered = shallow(
      <GameDetailsButtons {...props} hasPlayForFun={false} />
    );
    expect(rendered.find(ButtonPrimary).length).toBe(1);
    expect(
      rendered
        .find(ButtonPrimary)
        .dive()
        .find("span")
        .text()
    ).toBe(props.playButtonText);
  });
});

describe("GameDetails", () => {
  test("should return null if game is empty", () => {
    const rendered = shallow(
      <GameDetails
        data={{
          game: null,
        }}
        t={t}
      />
    );
    expect(rendered.equals(null)).toBe(true);
  });

  test("should render game artwork, name and description", () => {
    const rendered = shallow(<GameDetails data={gameDetails} t={t} />);
    expect(rendered.find(GameDetailsImage).length).toBe(1);
    expect(
      rendered
        .find(GameDetailsImage)
        .dive()
        .find(Text).length
    ).toBe(0);
    expect(rendered.find("[data-testid='game-name-text']").length).toBe(1);
    expect(rendered.find("[data-testid='game-description-text']").length).toBe(
      1
    );
    expect(rendered.find(GameDetailsMedia).length).toBe(1);
  });

  test("should render GameDetailsButtons if game isn't in maintenance", () => {
    const rendered = shallow(<GameDetails data={gameDetails} t={t} />);

    expect(rendered.find(GameDetailsButtons).length).toBe(1);
  });

  test("should not render GameDetailsButtons if game is in maintenance", () => {
    const rendered = shallow(
      <GameDetails data={gameDetailsInMaintenance} t={t} />
    );

    expect(rendered.find(GameDetailsButtons).length).toBe(0);
  });

  test("should render GameDetailsImage with maintenance message when in maintenace", () => {
    const rendered = shallow(
      <GameDetails data={gameDetailsInMaintenance} t={t} />
    );
    expect(rendered.find(GameDetailsImage).length).toBe(1);
    expect(
      rendered
        .find(GameDetailsImage)
        .find(Text)
        .dive()
        .text()
    ).toBe("Temporarily unavailable");
  });
});
