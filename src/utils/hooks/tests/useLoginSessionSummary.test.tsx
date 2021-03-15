import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useJurisdiction } from "Utils/hooks/useJurisdiction";
import { getLoginSessionSummary } from "Api/api.esLoginSessionSummary";
import { useLoginSessionSummary } from "../useLoginSessionSummary";

jest.useFakeTimers();
jest.mock("Api/api.esLoginSessionSummary");
jest.mock("Utils/hooks/useJurisdiction", () => ({
  useJurisdiction: jest.fn(),
}));
jest.mock("react-redux", () => ({
  useSelector: () => "user-session-id",
}));

const mockFn = (fn: any) => fn;

function mockUseJurisdiction(jurisdiction) {
  mockFn(useJurisdiction).mockReturnValue({
    jurisdiction,
    [`is${jurisdiction}`]: true,
  });
}

function mockLoginSessionSummary(resp = {}) {
  mockFn(getLoginSessionSummary).mockResolvedValue(resp);
}

describe("useLoginSessionSummary", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("it calls API with session ID to retrieve login session summary when in DGOJ", async () => {
    const resp = { one: 1 };

    mockUseJurisdiction("DGOJ");
    mockLoginSessionSummary(resp);

    const wrapper = mount(
      <HookWrapper hook={useLoginSessionSummary} args={[]} />
    );

    expect(getLoginSessionSummary).toHaveBeenCalledWith("user-session-id");

    await act(async () => {
      await jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toEqual({
      loginSessionSummary: resp,
    });
  });

  test("it does not call API when not in DGOJ", () => {
    mockUseJurisdiction("MGA");
    mockLoginSessionSummary({});

    mount(<HookWrapper hook={useLoginSessionSummary} args={[]} />);

    expect(getLoginSessionSummary).not.toHaveBeenCalled();
  });
});
