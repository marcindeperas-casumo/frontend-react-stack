// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import cx from "classnames";
import { useTranslationsGql } from "Utils/hooks";
import { CMS_SLUGS as CMS_SLUG } from "Models/playing/playing.constants";
import { type CurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";

import "../ReelRaceIcon.scss";

export const PointsView = ({
  points,
  className,
}: CurrentReelRaceInfo & { className?: string }) => {
  const { t } = useTranslationsGql({
    reel_races_drawer_pts: `root:${CMS_SLUG.MODAL_WAGERING}:fields.reel_races_drawer_pts`,
  });

  return (
    <Flex
      className={cx(className)}
      direction="vertical"
      spacing="none"
      align="center"
    >
      <Flex.Item>
        <Text className="t-color-grey-50 " tag="div" size="xs">
          {t.reel_races_drawer_pts}
        </Text>
      </Flex.Item>
      <Flex.Item>
        <Text className="t-color-white u-font-weight-bold" tag="div" size="sm">
          {points}
        </Text>
      </Flex.Item>
    </Flex>
  );
};

// eslint-disable-next-line fp/no-mutation
PointsView.displayName = "PointsView";
