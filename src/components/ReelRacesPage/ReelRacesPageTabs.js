// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import type { ReelRacesContentPage } from "./ReelRacesPageContainer";
type Props = {
  t: ?ReelRacesContentPage,
  activeTab: string,
  setActiveTab: (tab: string) => void,
};

export function ReelRacesPageTabs({
  t,
  activeTab,
  setActiveTab = () => {},
}: Props) {
  const isNotMobile = useIsScreenMinimumTablet();

  return (
    <div className="t-background-grey-0">
      <div className="u-content-width--tablet-landscape u-padding-y--md">
        <Flex
          justify="center"
          spacing="none"
          className={cx(
            "t-background-white u-font-weight-bold",
            isNotMobile &&
              "t-border-r-top-left--md t-border-r-top-right--md u-margin-x--md"
          )}
        >
          <Flex.Block
            onClick={() => setActiveTab("SCHEDULE")}
            align="center"
            className={cx(
              "t-border-bottom--lg",
              activeTab === "SCHEDULE"
                ? "t-border-purple-60 t-color-purple-60"
                : "t-border-grey-20 t-color-grey-20 u-cursor-pointer"
            )}
          >
            <Text className="u-padding-y--md u-padding-x--lg" tag="div">
              {t?.schedule_tab_title}
            </Text>
          </Flex.Block>
          <Flex.Block
            onClick={() => setActiveTab("PREVIOUS")}
            align="center"
            className={cx(
              "t-border-bottom--lg",
              activeTab === "PREVIOUS"
                ? "t-border-purple-60 t-color-purple-60"
                : "t-border-grey-20 t-color-grey-20 u-cursor-pointer"
            )}
          >
            <Text className="u-padding-y--md u-padding-x--lg" tag="div">
              {t?.previous_winners_tab_title}
            </Text>
          </Flex.Block>
        </Flex>
      </div>
    </div>
  );
}
