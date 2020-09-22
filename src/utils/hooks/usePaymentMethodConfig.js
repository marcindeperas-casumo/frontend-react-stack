import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  preparePaymentMethodConfig,
  methodConfigSelector,
} from "Models/payments";

export const usePaymentMethodConfig = methodType => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(preparePaymentMethodConfig(methodType));
  });

  return useSelector(methodConfigSelector(methodType));
};
