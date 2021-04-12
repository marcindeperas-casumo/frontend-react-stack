import React from "react";
import { ComponentBuilder } from "Components/ComponentBuilder";
import { useMarket } from "Utils/hooks";

export const VirtualsPage: React.FC<{}> = () => {
  const market = useMarket();

  return (
    <ComponentBuilder slug={`built-pages.top-lists-virtual-sports-${market}`} />
  );
};
