import { ComponentBuilder } from "Components/ComponentBuilder";
import React from "react";

type Props = {
  currentHash: string
}

export const PromotionDetailPage: React.FC<Props> = ({ currentHash }) => {
  const slug = currentHash.replace('#', '');

  return <ComponentBuilder slug={`promotions.${slug}`} />;
};
