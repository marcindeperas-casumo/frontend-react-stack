import React from "react";
import cx from "classnames";
import { ComponentBuilder } from "Components/ComponentBuilder";
import { isDesktop } from "Components/ResponsiveLayout";

type TProps = {
  slug: string;
};

const ROOT_CLASSNAME = "c-promotion-detail";

// TODO: check why grid is being applied across all screen sizes and not respecting breakpoints
export const PromotionDetailPage: React.FC<TProps> = ({ slug }: TProps) => {
  return (
    <div className={cx(ROOT_CLASSNAME)}>
      <div
        className={cx(
          `${ROOT_CLASSNAME}__content`,
          "pt-xlg",
          isDesktop() &&
            "desktop:grid desktop:grid-cols-2 desktop:pt-3xlg desktop:p-xlg"
        )}
      >
        <ComponentBuilder slug={slug} />
      </div>
    </div>
  );
};
