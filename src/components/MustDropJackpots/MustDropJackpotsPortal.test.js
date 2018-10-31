import React from "react";
import { shallow } from "enzyme";
import ReactDOM from "react-dom";
import MustDropJackpotsPortal from "Components/MustDropJackpots/MustDropJackpotsPortal";

jest.mock("react-dom");
const createPortal = ReactDOM.createPortal;

describe("MustDropJackpotsPortal", () => {
  test("should create a Portal", () => {
    shallow(<MustDropJackpotsPortal isFetching="false" />);

    expect(createPortal).toHaveBeenCalledTimes(1);
  });
});
