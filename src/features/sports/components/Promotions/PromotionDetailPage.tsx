import React from "react";
import { ComponentBuilder } from "Components/ComponentBuilder";

type Props = {
  currentHash: string;
};

export const PromotionDetailPage: React.FC<Props> = ({ currentHash }) => {
  const slug = currentHash.replace("#", "");

  return <ComponentBuilder slug={`promotions.${slug}`} />;
};
