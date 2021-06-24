import React from "react";
import cx from "classnames";
import { ComponentBuilder } from "Components/ComponentBuilder";
import { isTablet, isDesktop } from "Components/ResponsiveLayout";

type TProps = {
  slug: string;
};

const ROOT_CLASSNAME = "c-promotion-detail";

// TODO: check why tailwinds responsive variants are not working
// e.g. "tablet:grid tablet:grid-cols-2 tablet:pt-3xlg tablet:p-xlg"
export const PromotionDetailPage: React.FC<TProps> = ({ slug }: TProps) => {
  const isTabletOrDesktop = isTablet() || isDesktop();
  return (
    <div className={cx(ROOT_CLASSNAME)}>
      <div
        className={cx(
          `${ROOT_CLASSNAME}__content`,
          isTabletOrDesktop &&
            "tablet:grid tablet:grid-cols-2 tablet:pt-3xlg tablet:p-xlg"
        )}
      >
        <ComponentBuilder slug={slug} />
      </div>
    </div>
  );
};
