import React from "react";
import { mount } from "enzyme";
import { ENVIRONMENTS, DEVICES } from "Src/constants";
import { DEFAULT_LANGUAGE } from "Models/handshake";
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

jest.mock("../../utils/hooks", () => ({
  ...jest.requireActual("../../utils/hooks"),
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
    const rendered = mount(<GamePage {...mockedProps} />);
    expect(rendered.find(ErrorMessage)).toHaveLength(1);
  });
  test("should call onMount function of game provider model if model is provided", () => {
    const props = {
      ...mockedProps,
      slug: SUCCESSFUL_SLUG,
    };
    mount(<GamePage {...props} />);
    expect(mockedOnMount).toBeCalledTimes(1);
  });
  test("should render component with props as provided by game provider model if model is provided", () => {
    const props = {
      ...mockedProps,
      slug: SUCCESSFUL_SLUG,
    };
    const rendered = mount(
      <div>
        <GamePage {...props} />
      </div>
    );
    expect(rendered.find("div#game-wrapper")).toHaveLength(1);
  });
});
