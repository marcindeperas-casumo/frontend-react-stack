// @flow
import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
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

    expectHook(wrapper).toMatchObject({
      hrsPerDay: daily,
      hrsPerWeek: weekly,
      hrsPerMonth: monthly,
    });
  });

  test("it updates minHrsPerWeek and minHrsPerMonth when hrsPerDay changes", () => {
    const wrapper = prepareWrapper(prepareState(5, 10, 15));

    act(() => {
      findHookProp(wrapper).setHrsPerDay(10);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      minHrsPerWeek: 10,
      minHrsPerMonth: 10,
    });
  });

  test("it updates maxHrsPerDay and minHrsPerMonth when hrsPerWeek changes", () => {
    const wrapper = prepareWrapper(prepareState(null, null, null));

    act(() => {
      findHookProp(wrapper).setHrsPerWeek(19);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      maxHrsPerDay: 19,
      minHrsPerMonth: 19,
    });
  });

  test("it updates maxHrsPerWeek when hrsPerMonth changes", () => {
    const wrapper = prepareWrapper(prepareState(1, 1, 1));

    act(() => {
      findHookProp(wrapper).setHrsPerMonth(17);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      maxHrsPerWeek: 17,
    });
  });

  test("it updates maxHrsPerWeek when hrsPerMonth changes but only to the max allowed value", () => {
    const wrapper = prepareWrapper(prepareState(1, 1, 1));

    act(() => {
      findHookProp(wrapper).setHrsPerMonth(201);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      maxHrsPerWeek: 167,
    });
  });

  test("it updates dailyLimitErrorMessage when hrsPerDay changes to value outside of range", () => {
    const weekly = 10;
    const wrapper = prepareWrapper(prepareState(3, weekly, 30));

    act(() => {
      findHookProp(wrapper).setHrsPerDay(201);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      dailyLimitErrorMessage: limitErrorMessage(1, weekly, 201),
    });

    // eslint-disable-next-line sonarjs/no-identical-functions
    act(() => {
      findHookProp(wrapper).setHrsPerDay(10);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      dailyLimitErrorMessage: "",
    });
  });

  test("it updates weeklyLimitErrorMessage when hrsPerWeek changes to value outside of range", () => {
    const monthly = 30;
    const wrapper = prepareWrapper(prepareState(3, 10, monthly));
    const newValue = 170;

    act(() => {
      findHookProp(wrapper).setHrsPerWeek(newValue);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      weeklyLimitErrorMessage: limitErrorMessage(1, monthly, newValue),
    });

    act(() => {
      findHookProp(wrapper).setHrsPerWeek(100);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      weeklyLimitErrorMessage: limitErrorMessage(1, monthly, newValue),
    });

    act(() => {
      findHookProp(wrapper).setHrsPerWeek(29);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      weeklyLimitErrorMessage: "",
    });
  });

  test("it updates monthlyLimitErrorMessage when hrsPerMonth changes to value outside of range", () => {
    const weekly = 10;
    const monthly = 30;
    const wrapper = prepareWrapper(prepareState(3, weekly, monthly));
    const newValue = 7;

    act(() => {
      findHookProp(wrapper).setHrsPerMonth(newValue);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      monthlyLimitErrorMessage: limitErrorMessage(weekly, monthly, newValue),
    });

    act(() => {
      findHookProp(wrapper).setHrsPerMonth(100);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      monthlyLimitErrorMessage: "",
    });
  });
});
