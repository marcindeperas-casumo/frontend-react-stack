import React from "react";
import ComponentBuilder from "Components/ComponentBuilder";

export const PromotionPage: React.FC = () => {
  return (
    <div>
      <ComponentBuilder
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; slug: string; }' is not assi... Remove this comment to see the full error message
        path="top"
        slug="campaigns.winter-games"
      />
      <ComponentBuilder
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; slug: string; }' is not assi... Remove this comment to see the full error message
        path="top"
        slug="campaigns.coutdown-to-2020"
      />
    </div>
  );
};
