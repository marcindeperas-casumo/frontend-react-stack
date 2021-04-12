import * as React from "react";
import * as R from "ramda";
import { useSelector, useDispatch } from "react-redux";
import { getPaymentMethodTypes } from "Api/api.payments";
import {
  savedMethodsSelector,
  countrySelector,
  currencySelector,
} from "Models/handshake";
import {
  preparePaymentMethodConfig,
  methodsConfigsSelector,
  TCurrencyProfiles,
  TCurrencyProfile,
} from "Models/payments";
import { SUPPORTED_QUICKDEPOSIT_TYPES } from "Models/payments/methodConfig.constants";
import type {
  SavedMethodType,
  TMethodConfig,
  AvailableMethod,
  QuickDepositMethod,
  LocalPaymentMethodTypeKeys,
} from "Models/payments";
import { TCurrencyCode } from "Src/constants";

const isMethodAvailableForQuickDeposit = (cmsConfig: TMethodConfig) =>
  cmsConfig.mobile.deposit.quick;

const isAvailableInCountry = (cmsConfig: TMethodConfig, country: string) =>
  !R.includes(country, cmsConfig.mobile.deposit.disabledCountries);

export const convertMethodTypesToMap = (
  methods: Array<AvailableMethod>
  // @ts-expect-error ts-migrate(1337) FIXME: An index signature parameter type cannot be a unio... Remove this comment to see the full error message
): { [key: LocalPaymentMethodTypeKeys]: AvailableMethod } =>
  methods.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.type]: cur,
    };
  }, {});

const getCurrencyProfile = R.memoizeWith(
  (currency: TCurrencyCode) => currency as string,
  (currency: TCurrencyCode, profiles: TCurrencyProfiles) => {
    // Backwords compatibility with CMS. @mstrz: remove in due time.
    const defaultCurrencyCode =
      typeof profiles.default === "string" ? profiles.default : "default";

    return (
      (profiles[currency] as TCurrencyProfile) ||
      (profiles[defaultCurrencyCode] as TCurrencyProfile)
    );
  }
);

export const prepareQuickDepositMethod = (
  currency: TCurrencyCode,
  playerMethod: SavedMethodType,
  cmsConfig: TMethodConfig,
  method: AvailableMethod
): QuickDepositMethod => ({
  ...playerMethod,
  limits: getCurrencyProfile(currency, cmsConfig.profiles).limits,
  image: cmsConfig.image,
  displayName: method?.displayName,
});

export const useAvailableQuickDepositMethods = (): Array<QuickDepositMethod> => {
  const [availableMethods, setAvailableMethods] = React.useState([]);
  const [methodTypes, setMethodTypes] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const savedMethods = useSelector(savedMethodsSelector);

  const playerCountry = useSelector(countrySelector);
  const currency = useSelector(currencySelector);
  const methodsConfigs = useSelector(
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'never'.
    methodsConfigsSelector(savedMethods.map(method => method.type))
  ) as { [key in LocalPaymentMethodTypeKeys]: TMethodConfig }; // eslint-disable-line no-unused-vars

  const dispatch = useDispatch();

  React.useEffect(() => {
    savedMethods.forEach(({ type }) => {
      if (R.includes(type, SUPPORTED_QUICKDEPOSIT_TYPES)) {
        dispatch(preparePaymentMethodConfig(type));
      }
    });
  }, [savedMethods, dispatch]);

  React.useEffect(() => {
    if (!methodTypes && !loading) {
      setLoading(true);
      getPaymentMethodTypes().then(result => {
        setMethodTypes(convertMethodTypesToMap(result));
      });
    }
  }, [loading, methodTypes]);

  React.useEffect(() => {
    if (methodTypes && savedMethods.length && playerCountry) {
      setAvailableMethods(
        savedMethods.reduce((quickDepositMethods, playerMethod) => {
          const config =
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'never'.
            methodsConfigs[playerMethod.type as LocalPaymentMethodTypeKeys];

          if (
            config &&
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'deleted' does not exist on type 'never'.
            !playerMethod.deleted &&
            isMethodAvailableForQuickDeposit(config) &&
            isAvailableInCountry(config, playerCountry) &&
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'never'.
            !methodTypes[playerMethod.type].inMaintenanceMode
          ) {
            return quickDepositMethods.concat([
              prepareQuickDepositMethod(
                currency,
                playerMethod,
                config,
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'type' does not exist on type 'never'.
                methodTypes[playerMethod.type]
              ),
            ]);
          }

          return quickDepositMethods;
        }, [])
      );
    }
  }, [methodTypes, methodsConfigs, playerCountry, savedMethods, currency]);

  return availableMethods;
};
