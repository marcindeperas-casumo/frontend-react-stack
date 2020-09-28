// @flow
import * as React from "react";
import Media from "@casumo/cmp-media";
import Text from "@casumo/cmp-text";
import { type LocalPaymentMethodType } from "Models/payments";

type PaymentMethodDetailsProps = {
  method: LocalPaymentMethodType,
  logoUrl: string,
  maskedCardNo: string,
};

export const PaymentMethodDetails = ({
  method,
  logoUrl,
  maskedCardNo,
}: PaymentMethodDetailsProps) => {
  return (
    <Media
      renderImage={() => (
        <img
          className="u-display--block"
          width={64}
          alt={method}
          src={logoUrl}
        />
      )}
      renderText={() => (
        <Text size="sm" className="u-margin-bottom--sm u-font-weight-bold">
          {maskedCardNo}
        </Text>
      )}
    />
  );
};
