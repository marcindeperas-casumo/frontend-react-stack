import React from "react";
import ComponentBuilderContainer from "Components/ComponentBuilder";

// "site-page.casumo-jackpots"
// const slugRoot = "site-page.casumo-jackpots";

// const getSlugForPage = page => `${slugRoot}.${page}`;

export const SitePage = ({ slug }) => {
  return (
    <div>
      <ComponentBuilderContainer slug={'site-page.casumo-jackpots'} />
    </div>
  );
};
