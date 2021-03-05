import { IFRAME_MODE, IFRAME_PIQ_ENV } from "Models/payments";
import { actionTypes } from "./methodConfig.constants";

export type MethodConfigType = {
  profiles: {
    default: {
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
      grouping: {
        name: string;
        order: 1;
      };
    };
  };
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
  image: string;
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
