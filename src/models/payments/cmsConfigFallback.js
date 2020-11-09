//@flow
const DEFAULT_DEVICE_METHOD_CONFIGURATION = {
  defaultCreate: false,
  canCreate: true,
  disabled: false,
  disabledOverride: {
    methodType: null,
    identifierCheckCcUtilFunction: null,
  },
  enabledInDebug: false,
  enabledCountries: [],
  disabledCountries: [],
  requiredApi: null,
};

const DEFAULT_DEVICE_CONFIGURATION = {
  deposit: DEFAULT_DEVICE_METHOD_CONFIGURATION,
  withdraw: DEFAULT_DEVICE_METHOD_CONFIGURATION,
};

// Sane fallback if the CMS is down. Also a good example of how the configuration looks
export const FALLBACK_CONFIGURATION = {
  profiles: {
    default: {
      limits: {
        deposit: {
          min: 10,
          max: 2500,
        },
        withdraw: {
          min: 10,
          max: Number.MAX_VALUE,
          fee: 0,
          applicableFee: 0,
          withdrawableMin: 0,
        },
      },
      depositFees: {
        percentage: 0,
        fixed: 0,
      },
      defaultDepositAmounts: [25, 50, 100],
    },
  },
  provider: null,
  providerStatement: {
    default: "WWW.CASUMO.COM",
  },
  selectFields: {},
  providerLicenseMessage: null,
  mobile: DEFAULT_DEVICE_CONFIGURATION,
  desktop: DEFAULT_DEVICE_CONFIGURATION,

  canWithdrawWithoutDeposit: false,
  withdrawType: null,
  withdrawTypeByCountry: {},
  withdrawFallbackType: null,
  withdrawTypeInDebugMode: null,

  forceSingleInstance: false,
  hideUsableMethod: false,

  logPiqRequests: false,

  showFooterLogo: true,
};
