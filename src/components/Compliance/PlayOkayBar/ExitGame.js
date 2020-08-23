import React from "react";
import { ExitIcon } from "@casumo/cmp-icons";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";

export const ExitGame = () => {
  const { navigateToKO } = useCrossCodebaseNavigation();
  const exitGame = () => navigateToKO(ROUTE_IDS.TOP_LISTS);

  return <ExitIcon onClick={exitGame} />;
};
