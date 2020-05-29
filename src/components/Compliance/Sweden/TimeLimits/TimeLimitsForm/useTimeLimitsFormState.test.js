// @flow
import * as React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import MockStore from "Components/MockStore";
import { type PlayOkayReduxStore } from "Models/playOkay";
import {
  useTimeLimitsFormState,
  limitErrorMessage,
} from "./useTimeLimitsFormState";

jest.useFakeTimers();

const prepareState = (daily, weekly, monthly) => {
  const playOkay: PlayOkayReduxStore = {
    loginTimeLimits: {
      daily,
      weekly,
      monthly,
    },
  };

  return {
    playOkay: {
      playOkay,
    },
  };
};

const prepareWrapper = state => ({ children }) => (
  <MockStore state={state}>{children}</MockStore>
);

describe("Components/Compliance/Sweden/TimeLimits/useTimeLimitsFormState()", () => {
  test("it returns values initially set from Redux store", () => {
    const daily = 5;
    const weekly = 10;
    const monthly = 15;
    const wrapper = prepareWrapper(prepareState(daily, weekly, monthly));
    const { result } = renderHook(() => useTimeLimitsFormState(), { wrapper });

    expect(result.current.hrsPerDay).toEqual(daily);
    expect(result.current.hrsPerWeek).toEqual(weekly);
    expect(result.current.hrsPerMonth).toEqual(monthly);
  });

  test("it updates minHrsPerWeek and minHrsPerMonth when hrsPerDay changes", () => {
    const wrapper = prepareWrapper(prepareState(5, 10, 15));
    const { result, rerender } = renderHook(() => useTimeLimitsFormState(), {
      wrapper,
    });

    act(() => {
      result.current.setHrsPerDay(10);
      jest.runAllTimers();
      rerender();
    });

    expect(result.current.minHrsPerWeek).toEqual(10);
    expect(result.current.minHrsPerMonth).toEqual(10);
  });

  test("it updates maxHrsPerDay and minHrsPerMonth when hrsPerWeek changes", () => {
    const wrapper = prepareWrapper(prepareState(null, null, null));
    const { result, rerender } = renderHook(() => useTimeLimitsFormState(), {
      wrapper,
    });

    act(() => {
      result.current.setHrsPerWeek(19);
      jest.runAllTimers();
      rerender();
    });

    expect(result.current.maxHrsPerDay).toEqual(19);
    expect(result.current.minHrsPerMonth).toEqual(19);
  });

  test("it updates maxHrsPerWeek when hrsPerMonth changes", () => {
    const wrapper = prepareWrapper(prepareState(1, 1, 1));
    const { result, rerender } = renderHook(() => useTimeLimitsFormState(), {
      wrapper,
    });

    act(() => {
      result.current.setHrsPerMonth(17);
      jest.runAllTimers();
      rerender();
    });

    expect(result.current.maxHrsPerWeek).toEqual(17);
  });

  test("it updates maxHrsPerWeek when hrsPerMonth changes but only to the max allowed value", () => {
    const wrapper = prepareWrapper(prepareState(1, 1, 1));
    const { result, rerender } = renderHook(() => useTimeLimitsFormState(), {
      wrapper,
    });

    act(() => {
      result.current.setHrsPerMonth(201);
      jest.runAllTimers();
      rerender();
    });

    expect(result.current.maxHrsPerWeek).toEqual(161);
  });

  test("it updates dailyLimitErrorMessage when hrsPerDay changes to value outside of range", () => {
    const weekly = 10;
    const wrapper = prepareWrapper(prepareState(3, weekly, 30));
    const { result, rerender } = renderHook(() => useTimeLimitsFormState(), {
      wrapper,
    });

    act(() => {
      result.current.setHrsPerDay(201);
      jest.runAllTimers();
      rerender();
    });

    expect(result.current.dailyLimitErrorMessage).toEqual(
      limitErrorMessage(1, weekly, 201)
    );

    // eslint-disable-next-line sonarjs/no-identical-functions
    act(() => {
      result.current.setHrsPerDay(10);
      jest.runAllTimers();
      rerender();
    });

    expect(result.current.dailyLimitErrorMessage).toEqual("");
  });

  test("it updates weeklyLimitErrorMessage when hrsPerWeek changes to value outside of range", () => {
    const monthly = 30;
    const wrapper = prepareWrapper(prepareState(3, 10, monthly));
    const { result, rerender } = renderHook(() => useTimeLimitsFormState(), {
      wrapper,
    });
    const newValue = 170;

    act(() => {
      result.current.setHrsPerWeek(newValue);
      jest.runAllTimers();
      rerender();
    });

    expect(result.current.weeklyLimitErrorMessage).toEqual(
      limitErrorMessage(1, monthly, newValue)
    );

    act(() => {
      result.current.setHrsPerWeek(100);
      jest.runAllTimers();
      rerender();
    });

    expect(result.current.weeklyLimitErrorMessage).toEqual(
      limitErrorMessage(1, monthly, newValue)
    );

    act(() => {
      result.current.setHrsPerWeek(29);
      jest.runAllTimers();
      rerender();
    });

    expect(result.current.weeklyLimitErrorMessage).toEqual("");
  });

  test("it updates monthlyLimitErrorMessage when hrsPerMonth changes to value outside of range", () => {
    const weekly = 10;
    const monthly = 30;
    const wrapper = prepareWrapper(prepareState(3, weekly, monthly));
    const { result, rerender } = renderHook(() => useTimeLimitsFormState(), {
      wrapper,
    });
    const newValue = 7;

    act(() => {
      result.current.setHrsPerMonth(newValue);
      jest.runAllTimers();
      rerender();
    });

    expect(result.current.monthlyLimitErrorMessage).toEqual(
      limitErrorMessage(weekly, monthly, newValue)
    );

    act(() => {
      result.current.setHrsPerMonth(100);
      jest.runAllTimers();
      rerender();
    });

    expect(result.current.monthlyLimitErrorMessage).toEqual("");
  });
});
