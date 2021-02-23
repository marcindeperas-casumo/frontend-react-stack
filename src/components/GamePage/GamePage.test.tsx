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
  // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
  error: <GamePageError />,
  gameBackground: "",
  gameProviderModel: {
    onMount: mockedOnMount,
    fitToParentSize: () => {},
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
        {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ error: Element; gameBackground: string; ga... Remove this comment to see the full error message */}
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
        {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ error: any; slug: string; gameBackground: ... Remove this comment to see the full error message */}
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
        {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ error: any; loading: any; slug: string; ga... Remove this comment to see the full error message */}
        <GamePage {...props} />
      </MockStore>
    );

    expect(rendered.find(GameComponent)).toHaveLength(1);
  });
});
