import React from "react";
import { mount } from "enzyme";
import { ENVIRONMENTS, DEVICES } from "Src/constants";
import { DEFAULT_LANGUAGE } from "Models/handshake";
import MockStore from "Components/MockStore";
import { ErrorMessage } from "Components/ErrorMessage";
import { GamePage } from "./GamePage";

const mockedOnMount = jest.fn();
const SUCCESSFUL_SLUG = "successfully-loaded-game";
const mockedProps = {
  environment: ENVIRONMENTS.TEST,
  language: DEFAULT_LANGUAGE,
  platform: DEVICES.MOBILE,
  playForFun: true,
  slug: "error-prone-game",
  errorMessage: "Error has occurred",
  fetchTranslations: () => {},
};

jest.mock("../../utils/hooks/useGameLaunchData.js", () => ({
  useGameLaunchData: jest.fn().mockImplementation(({ slug }) => {
    return {
      gameProviderModel: {
        onMount: mockedOnMount,
        componentTag: "div",
        componentProps: {
          id: "game-wrapper",
        },
      },
      pauseGame: () => {},
      resumeGame: () => {},
      error: slug === "error-prone-game",
    };
  }),
}));

describe("GamePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should not render if error occurs", () => {
    const rendered = mount(
      <MockStore>
        <GamePage {...mockedProps} />
      </MockStore>
    );
    expect(rendered.find(ErrorMessage)).toHaveLength(1);
  });
  test("should call onMount function of game provider model if model is provided", () => {
    const props = {
      ...mockedProps,
      slug: SUCCESSFUL_SLUG,
    };
    mount(
      <MockStore>
        <GamePage {...props} />
      </MockStore>
    );
    expect(mockedOnMount).toBeCalledTimes(1);
  });
  test("should render component with props as provided by game provider model if model is provided", () => {
    const props = {
      ...mockedProps,
      slug: SUCCESSFUL_SLUG,
    };
    const rendered = mount(
      <MockStore>
        <GamePage {...props} />
      </MockStore>
    );
    expect(rendered.find("div#game-wrapper")).toHaveLength(1);
  });
});
