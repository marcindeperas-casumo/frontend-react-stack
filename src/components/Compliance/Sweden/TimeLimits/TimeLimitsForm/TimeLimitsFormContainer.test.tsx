// @flow
import * as React from "react";
import { useDispatch } from "react-redux";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import MockStore from "Components/MockStore";
import { playerIdSelector } from "Models/handshake";
import {
  prepareStateMock,
  saveLoginTimeLimitAction,
  getAllLimits as getAllLimitsAction,
} from "Models/playOkay";
import { TimeLimitsFormContainer } from "./TimeLimitsFormContainer";
import { transformFormDataToRequestPayloads } from "./TimeLimitsForm.utils";

jest.useFakeTimers();

jest.mock("react-redux", () => {
  const { Provider, useSelector } = jest.requireActual("react-redux");

  return {
    useDispatch: jest.fn().mockReturnValue(),
    useSelector,
    Provider,
  };
});

jest.mock("Api/api.playOkay", () => {
  return {
    setLoginTimeLimit: jest.fn().mockResolvedValue(true),
    getAllLimits: jest.fn().mockResolvedValue(true),
  };
});

describe("Components/Compliance/TimeLimits/TimeLimitsFormContainer", () => {
  let wrapper;
  let globalStore;
  let onLimitsSaved;
  let dispatchMock;
  let playerId;

  beforeAll(() => {
    onLimitsSaved = jest.fn();
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    wrapper = mount(
      <MockStore state={prepareStateMock({ loginTimeLimits: { daily: 10 } })}>
        <TimeLimitsFormContainer onLimitsSaved={onLimitsSaved} />
      </MockStore>
    );
    globalStore = wrapper.find("Provider").prop("store");

    playerId = playerIdSelector(globalStore.getState());

    // wrap real implementation with a mock to inspect arguments
    dispatchMock.mockImplementation(action => globalStore.dispatch(action));
    useDispatch.mockReturnValue(dispatchMock);
  });

  test("First the CTA button is disabled because not all limits are entered", () => {
    expect(wrapper.find("button").prop("disabled")).toEqual(true);
  });

  test("Then the CTA button is enabled when missing limits are provided", () => {
    const weeklyInput = wrapper.find("TextInput input").at(1);
    const monthlyInput = wrapper.find("TextInput input").at(2);

    act(() => {
      // $FlowIgnore
      weeklyInput.instance().value = 99;
      weeklyInput.simulate("change");
      // $FlowIgnore
      monthlyInput.instance().value = 150;
      monthlyInput.simulate("change");
      jest.runAllTimers();
      wrapper.update();
    });

    expect(wrapper.find("button").prop("disabled")).toEqual(false);
  });

  test("Next after clicking the CTA button 3 actions are dispatched to save newly set limits", () => {
    act(() => {
      wrapper.find("button").simulate("click");
      jest.runAllTimers();
      wrapper.update();
    });

    const requestPayloads = transformFormDataToRequestPayloads(
      {
        hrsPerDay: 10,
        hrsPerWeek: 99,
        hrsPerMonth: 150,
      },
      playerId
    );

    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      saveLoginTimeLimitAction(requestPayloads[0])
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      2,
      saveLoginTimeLimitAction(requestPayloads[1])
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      saveLoginTimeLimitAction(requestPayloads[2])
    );
  });

  test("Next after 3 limits are successfully saved a call to fetch all limits is started", () => {
    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });

    expect(dispatchMock).toHaveBeenCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      4,
      getAllLimitsAction({ playerId })
    );
  });

  test("When all limits are refetched, onLimitsSaved is called", () => {
    act(() => {
      jest.runAllTimers();
      wrapper.update();
    });

    expect(onLimitsSaved).toHaveBeenCalled();
  });
});
