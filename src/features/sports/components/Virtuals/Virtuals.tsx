import { ComponentBuilder } from "Components/ComponentBuilder";
import React from "react";
import { useMarket } from "Utils/hooks";

export const Virtuals: React.FC<{}> = () => {
  const market = useMarket();

  return <ComponentBuilder slug={`built-pages.top-lists-virtual-sports-${market}`} />;
};
