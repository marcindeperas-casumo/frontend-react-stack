// @flow
import * as React from "react";
import * as R from "ramda";
import { useSelector, useDispatch } from "react-redux";
import { getPaymentMethodTypes } from "Api/api.payments";
import { savedMethodsSelector, countrySelector } from "Models/handshake";
import {
  preparePaymentMethodConfig,
  methodsConfigsSelector,
} from "Models/payments";
import { SUPPORTED_QUICKDEPOSIT_TYPES } from "Models/payments/methodConfig.constants";
import type {
  SavedMethodType,
  MethodConfigType,
  AvailableMethod,
  QuickDepositMethod,
  LocalPaymentMethodTypeKeys,
} from "Models/payments";

const isMethodAvailableForQuickDeposit = cmsConfig =>
  cmsConfig.mobile.deposit.quick;

const isAvailableInCountry = (cmsConfig: MethodConfigType, country: string) =>
  !R.includes(country, cmsConfig.mobile.deposit.disabledCountries);

export const convertMethodTypesToMap = (
  methods: Array<AvailableMethod>
): { [key: LocalPaymentMethodTypeKeys]: AvailableMethod } =>
  methods.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.type]: cur,
    };
  }, {});

export const prepareQuickDepositMethod = (
  playerMethod: SavedMethodType,
  cmsConfig: MethodConfigType,
  method: AvailableMethod
): QuickDepositMethod => ({
  ...playerMethod,
  limits: cmsConfig.profiles.default.limits,
  image: cmsConfig.image,
  displayName: method?.displayName,
});

export const useAvailableQuickDepositMethods = (): Array<QuickDepositMethod> => {
  const [availableMethods, setAvailableMethods] = React.useState([]);
  const [methodTypes, setMethodTypes] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const savedMethods = useSelector(savedMethodsSelector);

  const playerCountry = useSelector(countrySelector);
  const methodsConfigs = useSelector(
    methodsConfigsSelector(savedMethods.map(method => method.type))
  );

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
          const config = methodsConfigs[playerMethod.type];

          if (
            config &&
            !playerMethod.deleted &&
            isMethodAvailableForQuickDeposit(config) &&
            isAvailableInCountry(config, playerCountry) &&
            !methodTypes[playerMethod.type].inMaintenanceMode
          ) {
            return quickDepositMethods.concat([
              prepareQuickDepositMethod(
                playerMethod,
                config,
                methodTypes[playerMethod.type]
              ),
            ]);
          }

          return quickDepositMethods;
        }, [])
      );
    }
  }, [methodTypes, methodsConfigs, playerCountry, savedMethods]);

  return availableMethods;
};
