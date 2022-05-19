import { blockOrigins } from "./payments.constants";

export type TBlockOrigin = keyof typeof blockOrigins;

export type TGetPaymentsPermissionsResponse =
  | {
      playerId: string;
      depositBlockOrigins: Array<TBlockOrigin>;
      withdrawalBlockOrigins: Array<TBlockOrigin>;
      depositAllowed: boolean;
      withdrawalAllowed: boolean;
      paymentMethods: Array<{
        paymentMethodId: string;
        depositBlockOrigins: Array<TBlockOrigin>;
        withdrawalBlockOrigins: Array<TBlockOrigin>;
        depositAllowed: boolean;
        withdrawalAllowed: boolean;
      }>;
    }
  | {
      paymentsPermissionsApiEnabled: false;
    };
