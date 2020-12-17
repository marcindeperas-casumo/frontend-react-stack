// @flow
import React from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { useIsScreenMinimumTablet, useTranslations } from "Utils/hooks";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import ReelRaceLogo from "./reel-race.svg";
import "./ReelRacesBanner.scss";

export type ReelRacesContentPage = {
  text: string,
  how_it_works_title: string,
  terms_and_conditions_title: string,
};

type BannerLinkProps = {
  children: any,
  onClick?: () => any,
};

function BannerLink({ children, onClick }: BannerLinkProps) {
  return (
    <Text
      className="u-cursor-pointer t-color-purple-60 u-font-weight-bold u-text-decoration-underline"
      onClick={onClick}
    >
      {children}
    </Text>
  );
}

export function ReelRacesBanner() {
  const isNotMobile = useIsScreenMinimumTablet();
  const dispatch = useDispatch();

  const t = useTranslations<ReelRacesContentPage>("reel-races");

  const showTAC = () => dispatch(showModal(REACT_APP_MODAL.ID.REEL_RACES_TAC));

  const links: any = {
    howItWorksLink: <BannerLink>{t?.how_it_works_title}</BannerLink>,
    termsAndConditionsLink: (
      <BannerLink onClick={showTAC}>{t?.terms_and_conditions_title}</BannerLink>
    ),
  };

  return (
    <div className="u-content-width--tablet-landscape u-padding-y--md">
      <Flex
        direction={isNotMobile ? "horizontal" : "vertical"}
        justify="center"
        spacing="none"
        className="u-text-align-left t-background-white u-margin--md t-border-r--md u-margin-x--md"
      >
        <Flex.Block
          align={isNotMobile ? "left" : "center"}
          className={cx({ "c-reel-races-banner__logo-mobile": isNotMobile })}
        >
          <Text className="u-padding-y--md u-padding-x--lg" tag="div">
            <ReelRaceLogo />
          </Text>
        </Flex.Block>

        <Flex.Block
          align={isNotMobile ? "left" : "center"}
          className="u-padding-y--md u-padding-x--lg"
        >
          <Text>{t?.text}</Text>

          {/* TODO when designs come */}
          {isNotMobile && (
            <Text>
              {links.termsAndConditionsLink}
              {/* {false && <>{links.howItWorksLink}</>} */}
            </Text>
          )}

          {!isNotMobile && (
            <Flex
              direction="vertical"
              justify="start"
              spacing="lg"
              className="u-text-align-left t-background-white t-color-purple-60 u-margin-y--lg"
            >
              {/* TODO when designs come */}
              {/* {false && (
                <Flex.Block align="center">{links.howItWorksLink}</Flex.Block>
              )} */}

              <Flex.Block align="center">
                {links.termsAndConditionsLink}
              </Flex.Block>
            </Flex>
          )}
        </Flex.Block>
      </Flex>
    </div>
  );
}
