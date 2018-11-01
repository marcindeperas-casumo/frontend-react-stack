import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import MustDropJackpotsPortal from "Components/MustDropJackpots/MustDropJackpotsPortal";
import MustDropJackpots from "Components/MustDropJackpots/MustDropJackpots";

jest.mock("react-dom");
const createPortal = ReactDOM.createPortal;

describe("MustDropJackpotsPortal", () => {
  beforeEach(() => {
    createPortal.mockClear();
  });

  test("should create a Portal", () => {
    shallow(<MustDropJackpotsPortal isFetching={false} />);

    expect(createPortal).toHaveBeenCalledTimes(1);
  });

  test("should show a MustDropJackpots component if fetching is false", () => {
    const mustDropJackpotsComponent = <MustDropJackpots />;
    const portalDiv = document.createElement("div");
    shallow(<MustDropJackpotsPortal isFetching={false} />);

    expect(createPortal).toHaveBeenCalledWith(
      mustDropJackpotsComponent,
      portalDiv
    );
  });

  test("should show a skeleton if fetching is true", () => {
    const mustDropJackpotsSkeletonComponent = <div>I'm a cute skeleton</div>;
    const portalDiv = document.createElement("div");
    shallow(<MustDropJackpotsPortal isFetching={true} />);

    expect(createPortal).toHaveBeenCalledWith(
      mustDropJackpotsSkeletonComponent,
      portalDiv
    );
  });
});
