import { ComponentBuilder } from "Components/ComponentBuilder";
import React from "react";
import { useMarket } from "Utils/hooks";

export const VirtualsPromo: React.FC<{}> = () => {
  const market = useMarket();

  return <ComponentBuilder slug="promotions.virtual-sports" />;
};
