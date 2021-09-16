import React from "react";
import ComponentBuilderContainer from "Components/ComponentBuilder";

// "site-page.casumo-jackpots"
// const slugRoot = "site-page.casumo-jackpots";

// const getSlugForPage = page => `${slugRoot}.${page}`;

export const ExplainerPage = ({ slug }) => {
  return (
    <div>
      <ComponentBuilderContainer
        slug={"built-pages.what-are-casumo-jackpots"}
      />
    </div>
  );
};
