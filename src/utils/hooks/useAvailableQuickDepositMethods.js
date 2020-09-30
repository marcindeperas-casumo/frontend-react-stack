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

export const useAvailableQuickDepositMethods = () => {
  const [availableMethod, setAvailableMethod] = React.useState();
  const [methodTypes, setMethodTypes] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const savedMethods = (useSelector(savedMethodsSelector) || []).map(
    method => method.type
  );

  const playerCountry = useSelector(countrySelector);
  const methodsConfigs = useSelector(methodsConfigsSelector(savedMethods));

  const dispatch = useDispatch();

  React.useEffect(() => {
    savedMethods.forEach(type => {
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
    if (methodTypes && savedMethods && playerCountry) {
      savedMethods.forEach(savedMethodType => {
        const config = methodsConfigs[savedMethodType];

        if (config && !availableMethod) {
          const quickDepositAvailable = config.mobile.deposit.quick;

          const countryAvailable = !R.includes(
            playerCountry,
            config.mobile.deposit.disabledCountries
          );

          const isInMaintenance = methodTypes.find(
            method => method.type === savedMethodType
          ).inMaintenanceMode;

          if (quickDepositAvailable && countryAvailable && !isInMaintenance) {
            setAvailableMethod(config);
          }
        }
      });
    }
  }, [
    availableMethod,
    methodTypes,
    methodsConfigs,
    playerCountry,
    savedMethods,
  ]);

  return availableMethod;
};
