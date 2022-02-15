import React from "react";
import { useMutation } from "@apollo/client";
import { ignoreDepositBonuses } from "Services/IgnoreDepositBonusesService";
import { depositBonusSelected } from "Services/DepositBonusSelectedService";
import { PlayerDepositValuables } from "Components/PlayerDepositValuables";
import { RefreshPlayerDepositValuables } from "./PlayerDepositValuables.graphql";

export const PlayerDepositValuablesSelection = () => {
  const [mutateRefreshDepositValuables] = useMutation(
    RefreshPlayerDepositValuables
  );

  const handleRefreshDepositValuables = async () => {
    await mutateRefreshDepositValuables();
    ignoreDepositBonuses();
  };

  return (
    <PlayerDepositValuables
      onSelectDepositBonus={badgeId => depositBonusSelected({ badgeId })}
      onRefreshDepositValuables={handleRefreshDepositValuables}
    />
  );
};
