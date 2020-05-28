// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { type LoginTimeLimits, loginTimeLimitsSelector } from "Models/playOkay";

const DEFAULT = {
  minHrsPerDay: 1,
  maxHrsPerDay: 23,
  minHrsPerWeek: 1,
  maxHrsPerWeek: 161,
  minHrsPerMonth: 1,
  maxHrsPerMonth: 713,
};

export type UseTimeLimitsFormStateType = {
  hrsPerDay: number,
  hrsPerWeek: number,
  hrsPerMonth: number,
  minHrsPerDay: number,
  minHrsPerWeek: number,
  minHrsPerMonth: number,
  maxHrsPerDay: number,
  maxHrsPerWeek: number,
  maxHrsPerMonth: number,
  setHrsPerDay: number => void,
  setHrsPerWeek: number => void,
  setHrsPerMonth: number => void,
  dailyLimitErrorMessage: string,
  weeklyLimitErrorMessage: string,
  monthlyLimitErrorMessage: string,
};

export function useTimeLimitsFormState(): UseTimeLimitsFormStateType {
  const savedTimeLimits = useSelector<LoginTimeLimits>(loginTimeLimitsSelector);

  const [hrsPerDay, setHrsPerDay] = React.useState<number>(
    savedTimeLimits?.daily || 0
  );
  const [hrsPerWeek, setHrsPerWeek] = React.useState<number>(
    savedTimeLimits?.weekly || 0
  );
  const [hrsPerMonth, setHrsPerMonth] = React.useState<number>(
    savedTimeLimits?.monthly || 0
  );

  const [minHrsPerDay] = React.useState<number>(DEFAULT.minHrsPerDay);
  const [maxHrsPerDay, setMaxHrsPerDay] = React.useState<number>(
    hrsPerWeek || DEFAULT.maxHrsPerDay
  );
  const [minHrsPerWeek, setMinHrsPerWeek] = React.useState<number>(
    hrsPerDay || DEFAULT.minHrsPerWeek
  );
  const [maxHrsPerWeek, setMaxHrsPerWeek] = React.useState<number>(
    hrsPerMonth || DEFAULT.maxHrsPerWeek
  );
  const [minHrsPerMonth, setMinHrsPerMonth] = React.useState<number>(
    hrsPerWeek || DEFAULT.minHrsPerMonth
  );
  const [maxHrsPerMonth] = React.useState<number>(DEFAULT.maxHrsPerMonth);

  const dailyLimitErrorMessage = limitErrorMessage(
    minHrsPerDay,
    maxHrsPerDay,
    hrsPerDay
  );
  const weeklyLimitErrorMessage = limitErrorMessage(
    minHrsPerWeek,
    maxHrsPerWeek,
    hrsPerWeek
  );
  const monthlyLimitErrorMessage = limitErrorMessage(
    minHrsPerMonth,
    maxHrsPerMonth,
    hrsPerMonth
  );

  React.useEffect(() => {
    if (hrsPerDay > 0) {
      setMinHrsPerWeek(Math.max(DEFAULT.minHrsPerWeek, hrsPerDay));
      setMinHrsPerMonth(Math.max(DEFAULT.minHrsPerMonth, hrsPerDay));
    }
  }, [hrsPerDay]);

  React.useEffect(() => {
    if (hrsPerWeek > 0) {
      setMaxHrsPerDay(Math.min(DEFAULT.maxHrsPerDay, hrsPerWeek));
      setMinHrsPerMonth(Math.max(DEFAULT.minHrsPerMonth, hrsPerWeek));
    }
  }, [hrsPerWeek]);

  React.useEffect(() => {
    if (hrsPerMonth > 0) {
      setMaxHrsPerWeek(Math.min(DEFAULT.maxHrsPerWeek, hrsPerMonth));
    }
  }, [hrsPerMonth]);

  return {
    hrsPerDay,
    hrsPerWeek,
    hrsPerMonth,
    minHrsPerDay,
    minHrsPerWeek,
    minHrsPerMonth,
    maxHrsPerDay,
    maxHrsPerWeek,
    maxHrsPerMonth,
    setHrsPerDay,
    setHrsPerWeek,
    setHrsPerMonth,
    dailyLimitErrorMessage,
    weeklyLimitErrorMessage,
    monthlyLimitErrorMessage,
  };
}

export function limitErrorMessage(
  minValue: number,
  maxValue: number,
  newValue: number
): string {
  if (newValue < minValue) {
    return `This limit should be at least ${minValue}.`;
  }
  if (newValue > maxValue) {
    return `This limit should be no more than ${maxValue}.`;
  }

  return "";
}
