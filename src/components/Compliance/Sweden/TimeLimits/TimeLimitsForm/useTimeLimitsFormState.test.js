// @flow
import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
// import { renderHook, act } from "@testing-library/react-hooks";
import MockStore from "Components/MockStore";
import { type PlayOkayReduxStore } from "Models/playOkay";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import {
  useTimeLimitsFormState,
  limitErrorMessage,
} from "./useTimeLimitsFormState";

jest.useFakeTimers();

const findHookProp = (wrapper: any) => wrapper.find("div").prop("hook");

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

const prepareWrapper = state =>
  mount(
    <MockStore state={state}>
      <HookWrapper hook={useTimeLimitsFormState} args={[]} />
    </MockStore>
  );

describe("Components/Compliance/Sweden/TimeLimits/useTimeLimitsFormState()", () => {
  test("it returns values initially set from Redux store", () => {
    const daily = 5;
    const weekly = 10;
    const monthly = 15;
    const wrapper = prepareWrapper(prepareState(daily, weekly, monthly));
    // const { result } = renderHook(() => useTimeLimitsFormState(), { wrapper });

    expectHook(wrapper).toMatchObject({
      hrsPerDay: daily,
      hrsPerWeek: weekly,
      hrsPerMonth: monthly,
    });
    // expect(result.current.hrsPerDay).toEqual(daily);
    // expect(result.current.hrsPerWeek).toEqual(weekly);
    // expect(result.current.hrsPerMonth).toEqual(monthly);
  });

  test("it updates minHrsPerWeek and minHrsPerMonth when hrsPerDay changes", () => {
    const wrapper = prepareWrapper(prepareState(5, 10, 15));
    // const { result } = renderHook(() => useTimeLimitsFormState(), {
    //   wrapper,
    // });

    act(() => {
      findHookProp(wrapper).setHrsPerDay(10);
      jest.runAllTimers();
      wrapper.update();
    });

    // expect(result.current.minHrsPerWeek).toEqual(10);
    // expect(result.current.minHrsPerMonth).toEqual(10);
    expectHook(wrapper).toMatchObject({
      minHrsPerWeek: 10,
      minHrsPerMonth: 10,
    });
  });

  test("it updates maxHrsPerDay and minHrsPerMonth when hrsPerWeek changes", () => {
    const wrapper = prepareWrapper(prepareState(null, null, null));
    // const { result } = renderHook(() => useTimeLimitsFormState(), {
    //   wrapper,
    // });

    act(() => {
      // result.current.setHrsPerWeek(19);
      findHookProp(wrapper).setHrsPerWeek(19);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      maxHrsPerDay: 19,
      minHrsPerMonth: 19,
    });

    // expect(result.current.maxHrsPerDay).toEqual(19);
    // expect(result.current.minHrsPerMonth).toEqual(19);
  });

  test("it updates maxHrsPerWeek when hrsPerMonth changes", () => {
    const wrapper = prepareWrapper(prepareState(1, 1, 1));
    // const { result } = renderHook(() => useTimeLimitsFormState(), {
    //   wrapper,
    // });

    act(() => {
      // result.current.setHrsPerMonth(17);
      findHookProp(wrapper).setHrsPerMonth(17);
      jest.runAllTimers();
      wrapper.update();
    });

    // expect(result.current.maxHrsPerWeek).toEqual(17);
    expectHook(wrapper).toMatchObject({
      maxHrsPerWeek: 17,
    });
  });

  test("it updates maxHrsPerWeek when hrsPerMonth changes but only to the max allowed value", () => {
    const wrapper = prepareWrapper(prepareState(1, 1, 1));
    // const { result } = renderHook(() => useTimeLimitsFormState(), {
    //   wrapper,
    // });

    act(() => {
      // result.current.setHrsPerMonth(201);
      findHookProp(wrapper).setHrsPerMonth(201);
      jest.runAllTimers();
      wrapper.update();
    });

    // expect(result.current.maxHrsPerWeek).toEqual(167);
    expectHook(wrapper).toMatchObject({
      maxHrsPerWeek: 167,
    });
  });

  test("it updates dailyLimitErrorMessage when hrsPerDay changes to value outside of range", () => {
    const weekly = 10;
    const wrapper = prepareWrapper(prepareState(3, weekly, 30));
    // const { result } = renderHook(() => useTimeLimitsFormState(), {
    //   wrapper,
    // });

    act(() => {
      // result.current.setHrsPerDay(201);
      findHookProp(wrapper).setHrsPerDay(201);
      jest.runAllTimers();
      wrapper.update();
    });

    // expect(result.current.dailyLimitErrorMessage).toEqual(
    //   limitErrorMessage(1, weekly, 201)
    // );
    expectHook(wrapper).toMatchObject({
      dailyLimitErrorMessage: limitErrorMessage(1, weekly, 201),
    });

    // eslint-disable-next-line sonarjs/no-identical-functions
    act(() => {
      // result.current.setHrsPerDay(10);
      findHookProp(wrapper).setHrsPerDay(10);
      jest.runAllTimers();
      wrapper.update();
    });

    // expect(result.current.dailyLimitErrorMessage).toEqual("");
    expectHook(wrapper).toMatchObject({
      dailyLimitErrorMessage: "",
    });
  });

  test("it updates weeklyLimitErrorMessage when hrsPerWeek changes to value outside of range", () => {
    const monthly = 30;
    const wrapper = prepareWrapper(prepareState(3, 10, monthly));
    // const { result } = renderHook(() => useTimeLimitsFormState(), {
    //   wrapper,
    // });
    const newValue = 170;

    act(() => {
      // result.current.setHrsPerWeek(newValue);
      findHookProp(wrapper).setHrsPerWeek(newValue);
      jest.runAllTimers();
      wrapper.update();
    });

    // expect(result.current.weeklyLimitErrorMessage).toEqual(
    //   limitErrorMessage(1, monthly, newValue)
    // );
    expectHook(wrapper).toMatchObject({
      weeklyLimitErrorMessage: limitErrorMessage(1, monthly, newValue),
    });

    act(() => {
      // result.current.setHrsPerWeek(100);
      findHookProp(wrapper).setHrsPerWeek(100);
      jest.runAllTimers();
      wrapper.update();
    });

    // expect(result.current.weeklyLimitErrorMessage).toEqual(
    //   limitErrorMessage(1, monthly, newValue)
    // );
    expectHook(wrapper).toMatchObject({
      weeklyLimitErrorMessage: limitErrorMessage(1, monthly, newValue),
    });

    act(() => {
      // result.current.setHrsPerWeek(29);
      findHookProp(wrapper).setHrsPerWeek(29);
      jest.runAllTimers();
      wrapper.update();
    });

    // expect(result.current.weeklyLimitErrorMessage).toEqual("");
    expectHook(wrapper).toMatchObject({
      weeklyLimitErrorMessage: "",
    });
  });

  test("it updates monthlyLimitErrorMessage when hrsPerMonth changes to value outside of range", () => {
    const weekly = 10;
    const monthly = 30;
    const wrapper = prepareWrapper(prepareState(3, weekly, monthly));
    // const { result } = renderHook(() => useTimeLimitsFormState(), {
    //   wrapper,
    // });
    const newValue = 7;

    act(() => {
      // result.current.setHrsPerMonth(newValue);
      findHookProp(wrapper).setHrsPerMonth(newValue);
      jest.runAllTimers();
      wrapper.update();
    });

    // expect(result.current.monthlyLimitErrorMessage).toEqual(
    //   limitErrorMessage(weekly, monthly, newValue)
    // );
    expectHook(wrapper).toMatchObject({
      monthlyLimitErrorMessage: limitErrorMessage(weekly, monthly, newValue),
    });

    act(() => {
      // result.current.setHrsPerMonth(100);
      findHookProp(wrapper).setHrsPerMonth(100);
      jest.runAllTimers();
      wrapper.update();
    });

    // expect(result.current.monthlyLimitErrorMessage).toEqual("");
    expectHook(wrapper).toMatchObject({
      monthlyLimitErrorMessage: "",
    });
  });
});
