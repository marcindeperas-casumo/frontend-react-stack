import React from "react";
import { mount } from "enzyme";
import { GameLauncher } from "./GameLauncher";

const mockedOnMount = jest.fn();
const mockedProps = {
  gameProviderModel: {
    onMount: mockedOnMount,
    componentTag: "div",
    componentProps: {
      id: "game-wrapper",
    },
  },
  slug: "error-prone-game",
};

describe("GameLauncher", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should not render if gameProvider is not provided", () => {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ slug: string; }' is not assignable to type... Remove this comment to see the full error message
    const rendered = mount(<GameLauncher slug="test-slug" />);
    expect(rendered.isEmptyRender()).toEqual(true);
  });
  test("should call onMount function of game provider model if no error occurs", () => {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ gameProviderModel: { onMount: Mock<any, an... Remove this comment to see the full error message
    mount(<GameLauncher {...mockedProps} />);
    expect(mockedOnMount).toBeCalledTimes(1);
  });
  test("should render component with props as provided by game provider model if no error occurs", () => {
    const rendered = mount(
      <div>
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ gameProviderModel: { onMount: Mock<any, an... Remove this comment to see the full error message */}
        <GameLauncher {...mockedProps} />
      </div>
    );
    expect(rendered.find("div#game-wrapper")).toHaveLength(1);
  });
});
