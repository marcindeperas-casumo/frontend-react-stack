// import React from "react";
// import { shallow } from "enzyme";
// import Jackpots from "Components/Jackpots/Jackpots";
// import jackpotsMock from "./__mocks__/response.games.mock";

// describe("<Jackpots />", () => {
//   test("renders a <ScrollableListTitle /> component", () => {
//     const rendered = shallow(<Jackpots jackpots={jackpotsMock} />);

//     expect(rendered.find("ScrollableListTitle").length).toBe(1);
//   });

//   test("groups 3 jackpots into a single column ", () => {
//     const numberOfColumns = 6;
//     const rendered = shallow(<Jackpots jackpots={jackpotsMock} />);

//     console.log("------------------------------------");
//     console.log(rendered.debug());
//     console.log("------------------------------------");

//     expect(rendered.find("JackpotsColumn").length).toBe(numberOfColumns);
//   });
// });
import React from "react";
import { render, fireEvent, configure } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Jackpots from "Components/Jackpots/Jackpots";
import jackpotsMock from "./__mocks__/response.games.mock";

configure({ testIdAttribute: "data-test" });

describe("<Jackpots />", () => {
  it("Should ...", () => {
    // console.log(jest.mock("@testing-library/react"));
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        matches: query === "screen and (min-width: undefined)" ? true : false,
        // matches: query === "screen and (max-width: NaNpx)" ? true : false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });
    // const spy = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <Jackpots jackpots={jackpotsMock} />
    );

    expect(getByTestId("scrollable-list-paginated")).toBeVisible();
    expect(queryByTestId("scrollable-jackpots")).not.toBeInTheDocument();
    // fireEvent.click(getByTestId(burgerButtonTestId));
    // expect(spy).toHaveBeenCalled();
  });

  it("Should ...", () => {
    // console.log(jest.mock("@testing-library/react"));
    window.matchMedia = jest.fn().mockImplementation(query => {
      return {
        // matches: query === "screen and (min-width: undefined)" ? true : false,
        matches: query === "screen and (max-width: NaNpx)" ? true : false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });
    // const spy = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <Jackpots jackpots={jackpotsMock} />
    );

    expect(getByTestId("scrollable-jackpots")).toBeVisible();
    expect(queryByTestId("scrollable-list-paginated")).not.toBeInTheDocument();

    // fireEvent.click(getByTestId(burgerButtonTestId));
    // expect(spy).toHaveBeenCalled();
  });
});
