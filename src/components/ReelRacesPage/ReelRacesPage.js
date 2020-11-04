// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { isMobile } from "@casumo/is-mobile";
import * as A from "Types/apollo";

type Props = {
  t: ?{
    schedule_tab_title: string,
    previous_winners_tab_title: string,
  },
};

type ReelRacesPageProps = Props & A.ReelRaceListQuery;

export function ReelRacesPage({ reelRaces, t }: ReelRacesPageProps) {
  const isNotMobile = !isMobile(window);

  return (
    <div className="t-background-grey-0">
      <div className="u-content-width--tablet-landscape u-padding-y--md">
        {/* Tabs */}
        <Flex
          justify="center"
          spacing="none"
          className={cx(
            "t-background-white u-font-weight-bold",
            isNotMobile && "t-border-r-top-left--md t-border-r-top-right--md"
          )}
        >
          <Flex.Block
            align="center"
            className="t-border-bottom--lg t-border-purple-60 t-color-purple-60"
          >
            <Text className="u-padding-y--md u-padding-x--lg" tag="div">
              {t?.schedule_tab_title}
            </Text>
          </Flex.Block>
          <Flex.Block
            align="center"
            className="t-border-bottom--lg t-border-grey-20 t-color-grey-20 u-cursor-pointer"
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
