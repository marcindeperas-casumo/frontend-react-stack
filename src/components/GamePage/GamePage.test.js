import React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { GamePage } from "./GamePage";
import { GamePageError } from "./GamePageError";

const mockedOnMount = jest.fn();
const SUCCESSFUL_SLUG = "successfully-loaded-game";
const LoadingComponent = () => <div>Loading</div>;
const GameComponent = () => <div>Game</div>;
const mockedProps = {
  error: <GamePageError />,
  gameBackground: "",
  gameProviderModel: {
    onMount: mockedOnMount,
    componentTag: "div",
    componentProps: {
      id: "game-wrapper",
    },
  },
  gameWindow: <GameComponent />,
  loading: <LoadingComponent />,
};

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

    expect(rendered.find(GamePageError)).toHaveLength(1);
  });
  test("should not render if loading", () => {
    const props = {
      ...mockedProps,
      error: null,
      slug: SUCCESSFUL_SLUG,
    };
    const rendered = mount(
      <MockStore>
        <GamePage {...props} />
      </MockStore>
    );

    expect(rendered.find(LoadingComponent)).toHaveLength(1);
  });

  test("should render game if not error or loading", () => {
    const props = {
      ...mockedProps,
      error: null,
      loading: null,
      slug: SUCCESSFUL_SLUG,
    };
    const rendered = mount(
      <MockStore>
        <GamePage {...props} />
      </MockStore>
    );

    expect(rendered.find(GameComponent)).toHaveLength(1);
  });
});
