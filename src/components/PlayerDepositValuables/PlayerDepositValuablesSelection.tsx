import React from "react";
import { useMutation } from "@apollo/client";
import { ignoreDepositBonuses } from "Services/IgnoreDepositBonusesService";
import { depositBonusSelected } from "Services/DepositBonusSelectedService";
import { PlayerDepositValuables } from "Components/PlayerDepositValuables";
import {
  usePaymentMethodContext,
  PaymentMethodContextProvider,
} from "Components/PaymentMethodDetails";
import { RefreshPlayerDepositValuables } from "./PlayerDepositValuables.graphql";

const PlayerDepositValuablesSelection = () => {
  const { selectedPaymentMethod } = usePaymentMethodContext();
  const [mutateRefreshDepositValuables] = useMutation(
    RefreshPlayerDepositValuables
  );

  const handleRefreshDepositValuables = async () => {
    await mutateRefreshDepositValuables();
    ignoreDepositBonuses();
  };

  return (
    <PlayerDepositValuables
      selectedPaymentMethod={selectedPaymentMethod}
      onSelectDepositBonus={badgeId => depositBonusSelected({ badgeId })}
      onRefreshDepositValuables={handleRefreshDepositValuables}
    />
  );
};

export const PlayerDepositValuablesSelectionContainer = () => (
  <PaymentMethodContextProvider>
    <PlayerDepositValuablesSelection />
  </PaymentMethodContextProvider>
);
