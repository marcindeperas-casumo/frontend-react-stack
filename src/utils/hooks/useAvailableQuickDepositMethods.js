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
} from "Models/payments/methodConfig.types";
const isMethodAvailableForQuickDeposit = cmsConfig =>
  cmsConfig.mobile.deposit.quick;

const isAvailableInCountry = (cmsConfig, country) =>
  !R.includes(country, cmsConfig.mobile.deposit.disabledCountries);

const inMaintenance = (methodType, availableMethods) =>
  availableMethods.find(method => method.type === methodType).inMaintenanceMode;

const isSavedMethodDeleted = method => method.deleted;

export const prepareQuickDepositMethod = (
  playerMethod: SavedMethodType,
  cmsConfig: MethodConfigType,
  method?: AvailableMethod
) => ({
  ...playerMethod,
  limits: cmsConfig.profiles.default.limits,
  displayName: method?.displayName,
});

export const useAvailableQuickDepositMethods = () => {
  const [availableMethod, setAvailableMethod] = React.useState();
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
        setMethodTypes(result);
      });
    }
  }, [loading, methodTypes]);

  React.useEffect(() => {
    if (methodTypes && savedMethods.length && playerCountry) {
      setAvailableMethod(
        savedMethods.reduce((quickDepositMethods, playerMethod) => {
          const config = methodsConfigs[playerMethod.type];

          if (
            !isSavedMethodDeleted(playerMethod) &&
            isMethodAvailableForQuickDeposit(config) &&
            isAvailableInCountry(config, playerCountry) &&
            !inMaintenance(playerMethod.type, methodTypes)
          ) {
            return quickDepositMethods.concat([
              prepareQuickDepositMethod(
                playerMethod,
                config,
                methodTypes.find(method => method.type === playerMethod.type)
              ),
            ]);
          }

          return quickDepositMethods;
        }, [])
      );
    }
  }, [methodTypes, methodsConfigs, playerCountry, savedMethods]);

  return availableMethod;
};
