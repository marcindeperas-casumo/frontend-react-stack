import { IFRAME_MODE, IFRAME_PIQ_ENV } from "Models/payments";
import { TCurrencyCode } from "Src/constants";
import { actionTypes } from "./methodConfig.constants";

type TGrouping = {
  name: string;
  order: number;
};
type TProfileKey = TCurrencyCode | "default";

export type TCurrencyProfile = {
  limits: {
    deposit: {
      min: number;
      max: number;
    };
    withdraw: {
      min: number;
      max: number;
      fee: number;
      applicableFee: number;
    };
  };
  depositFees: {
    percentage: number;
    fixed: number;
  };
  defaultDepositAmounts: Array<number>;
  grouping:
    | TGrouping
    | {
        mobile: TGrouping;
        desktop: TGrouping;
      };
};

export type TCurrencyProfiles = {
  // eslint-disable-next-line no-unused-vars
  [key in TProfileKey]: TCurrencyProfile | TCurrencyCode;
};

export type TMethodConfig = {
  profiles: TCurrencyProfiles;
  mobile: {
    withdraw: {
      disabled: boolean;
      disabledCountries: Array<string>;
    };
    deposit: {
      quick: boolean;
      nativeQuick: boolean;
      disabled: boolean;
      defaultCreate: boolean;
      disabledCountries: Array<string>;
    };
  };
  desktop: {
    withdraw: {
      disabled: boolean;
      disabledCountries: Array<string>;
    };
    deposit: {
      quick: boolean;
      disabled: boolean;
      defaultCreate: boolean;
      disabledCountries: Array<string>;
    };
  };
  image?: string;
};

export type SavedMethodType = {
  deleted: boolean;
  id: string;
  identifier: string | undefined;
  lastUsageTime: number;
  name: string;
  token: string | undefined;
  type: string;
};

export type AvailableMethod = {
  type: string;
  displayName: string;
  inMaintenanceMode: boolean;
};

export type QuickDepositMethod = SavedMethodType & {
  limits: any;
  image: string;
  displayName: string;
};

export type ActionTypes = ValueOf<typeof actionTypes>;
export type IframeModeValues = ValueOf<typeof IFRAME_MODE>;
export type IframePiqEnvValues = ValueOf<typeof IFRAME_PIQ_ENV>;
