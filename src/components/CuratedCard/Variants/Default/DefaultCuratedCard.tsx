import * as React from "react";
import cx from "classnames";
import { CuratedCardContainer as CuratedCard } from "Components/CuratedCard/CuratedCardContainer";
import { xPaddingClasses } from "Components/GameListHorizontal/constants";

type TProps = {
  card: string | Array<string>,
};

// We cannot name the property to "slug" easily here, we have to keep it as "card" as it getting
// the properties from the CMS and there it is used as "card" in a lot of places.
export const DefaultCuratedCard = ({ card }: TProps) => {
  const normalizedSlug = Array.isArray(card) ? card[0] : card;

  return (
    <div
      className={cx(
        "u-margin-top--md u-margin-top--none@desktop",
        xPaddingClasses
      )}
    >
      <div className="o-wrapper u-overflow--hidden t-border-r--md">
        <CuratedCard slug={normalizedSlug} />
      </div>
    </div>
  );
};
