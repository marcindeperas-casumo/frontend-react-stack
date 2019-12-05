import React from "react";
import { mount } from "enzyme";
import { ENVIRONMENTS, DEVICES } from "Src/constants";
import { DEFAULT_LANGUAGE } from "Models/handshake";
import { GameLauncher } from "./GameLauncher";

const mockedOnMount = jest.fn();
const SUCCESSFUL_SLUG = "successfully-loaded-game";
const mockedProps = {
  environment: ENVIRONMENTS.TEST,
  language: DEFAULT_LANGUAGE,
  onError: jest.fn(),
  platform: DEVICES.MOBILE,
  playForFun: true,
  slug: "error-prone-game",
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

describe("GameLauncher", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should not render if error occurs", () => {
    const rendered = mount(<GameLauncher {...mockedProps} />);
    expect(rendered.isEmptyRender()).toEqual(true);
  });
  test("should call onError if error occurs", () => {
    mount(<GameLauncher {...mockedProps} />);
    expect(mockedProps.onError).toBeCalledTimes(1);
  });
  test("should call onMount function of game provider model if no error occurs", () => {
    const props = {
      ...mockedProps,
      slug: SUCCESSFUL_SLUG,
    };
    mount(<GameLauncher {...props} />);
    expect(mockedOnMount).toBeCalledTimes(1);
  });
  test("should render component with props as provided by game provider model if no error occurs", () => {
    const props = {
      ...mockedProps,
      slug: SUCCESSFUL_SLUG,
    };
    const rendered = mount(
      <div>
        <GameLauncher {...props} />
      </div>
    );
    expect(rendered.find("div#game-wrapper")).toHaveLength(1);
  });
});
