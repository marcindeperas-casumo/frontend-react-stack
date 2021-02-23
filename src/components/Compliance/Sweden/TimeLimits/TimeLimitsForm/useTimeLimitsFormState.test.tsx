// @flow
import * as React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import MockStore from "Components/MockStore";
import { prepareStateMock } from "Models/playOkay";
import { HookWrapper, expectHook } from "Utils/HookWrapper";
import { useTranslationsGql } from "Utils/hooks";
import {
  useTimeLimitsFormState,
  limitErrorMessage,
} from "./useTimeLimitsFormState";
import mockCms from "./__mocks__/cms";

jest.useFakeTimers();
jest.mock("Utils/hooks");
// $FlowIgnore
useTranslationsGql.mockReturnValue({
  t: mockCms,
});

const findHookProp = (wrapper: any) => wrapper.find("div").prop("hook");

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
    const loginTimeLimits = { daily, weekly, monthly };
    const wrapper = prepareWrapper(prepareStateMock({ loginTimeLimits }));

    expectHook(wrapper).toMatchObject({
      hrsPerDay: daily,
      hrsPerWeek: weekly,
      hrsPerMonth: monthly,
    });
  });

  test("it updates minHrsPerWeek and minHrsPerMonth when hrsPerDay changes", () => {
    const daily = 5;
    const weekly = 10;
    const monthly = 15;
    const loginTimeLimits = { daily, weekly, monthly };
    const wrapper = prepareWrapper(prepareStateMock({ loginTimeLimits }));

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
    const loginTimeLimits = {};
    const wrapper = prepareWrapper(prepareStateMock({ loginTimeLimits }));

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
    const daily = 1;
    const weekly = 1;
    const monthly = 1;
    const loginTimeLimits = { daily, weekly, monthly };
    const wrapper = prepareWrapper(prepareStateMock({ loginTimeLimits }));

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
    const daily = 1;
    const weekly = 1;
    const monthly = 1;
    const loginTimeLimits = { daily, weekly, monthly };
    const wrapper = prepareWrapper(prepareStateMock({ loginTimeLimits }));

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
    const daily = 3;
    const weekly = 10;
    const monthly = 30;
    const loginTimeLimits = { daily, weekly, monthly };
    const wrapper = prepareWrapper(prepareStateMock({ loginTimeLimits }));

    act(() => {
      findHookProp(wrapper).setHrsPerDay(201);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      dailyLimitErrorMessage: limitErrorMessage(1, weekly, 201, mockCms),
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
    const daily = 3;
    const weekly = 10;
    const monthly = 30;
    const loginTimeLimits = { daily, weekly, monthly };
    const wrapper = prepareWrapper(prepareStateMock({ loginTimeLimits }));
    const newValue = 170;

    act(() => {
      findHookProp(wrapper).setHrsPerWeek(newValue);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      weeklyLimitErrorMessage: limitErrorMessage(1, monthly, newValue, mockCms),
    });

    act(() => {
      findHookProp(wrapper).setHrsPerWeek(100);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      weeklyLimitErrorMessage: limitErrorMessage(1, monthly, newValue, mockCms),
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
    const daily = 3;
    const weekly = 10;
    const monthly = 30;
    const loginTimeLimits = { daily, weekly, monthly };
    const wrapper = prepareWrapper(prepareStateMock({ loginTimeLimits }));
    const newValue = 7;

    act(() => {
      findHookProp(wrapper).setHrsPerMonth(newValue);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      monthlyLimitErrorMessage: limitErrorMessage(
        weekly,
        monthly,
        newValue,
        mockCms
      ),
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

  test("it returns anyLimitChanged=true if any limit differs from initial value", () => {
    const daily = 3;
    const weekly = 10;
    const monthly = 30;
    const loginTimeLimits = { daily, weekly, monthly };
    const wrapper = prepareWrapper(prepareStateMock({ loginTimeLimits }));
    const newWeekly = 15;

    expectHook(wrapper).toMatchObject({
      anyLimitChanged: false,
    });

    act(() => {
      findHookProp(wrapper).setHrsPerWeek(newWeekly);
      jest.runAllTimers();
      wrapper.update();
    });

    expectHook(wrapper).toMatchObject({
      anyLimitChanged: true,
    });
  });
});
