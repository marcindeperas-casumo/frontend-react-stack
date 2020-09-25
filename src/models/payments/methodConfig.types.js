//@flow
import { actionTypes } from "./methodConfig.constants";

export type MethodConfigType = {
  profiles: {
    default: {
      limits: {
        deposit: {
          min: Number,
          max: Number,
        },
        withdraw: {
          min: Number,
          max: Number,
          fee: Number,
          applicableFee: Number,
        },
      },
      depositFees: {
        percentage: Number,
        fixed: Number,
      },
      defaultDepositAmounts: Array<Number>,
      grouping: {
        name: String,
        order: 1,
      },
    },
  },
  mobile: {
    withdraw: {
      disabled: Boolean,
      disabledCountries: Array<String>,
    },
    deposit: {
      quick: Boolean,
      nativeQuick: Boolean,
      disabled: boolean,
      defaultCreate: boolean,
      disabledCountries: Array<String>,
    },
  },
  desktop: {
    withdraw: {
      disabled: boolean,
      disabledCountries: Array<String>,
    },
    deposit: {
      quick: boolean,
      disabled: boolean,
      defaultCreate: boolean,
      disabledCountries: Array<String>,
    },
  },
};

export type ActionTypes = $Values<typeof actionTypes>;
