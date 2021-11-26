import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as A from "Types/apollo";
import { getPlatform, setCookie } from "Utils";
import { useTranslations } from "Utils/hooks";
import { ValuableCard } from "Components/ValuableCard";
import { GameRowCustomHeader } from "Components/GameRow";
import { ValuableDetailsContainer } from "Components/ValuableDetails";
import { usePlayerValuableList } from "Components/PlayerValuableList/usePlayerValuableList";
import { UseValuable } from "Components/PlayerValuableList/PlayerValuables.graphql";
import {
  DISABLE_MODAL_COOKIE_KEY,
  PUSHER_MODAL_STATE,
  TYPE_PUSHER_MODAL_STATE,
} from "Components/Pusher/PusherModal";
import { PusherPaylod } from "Components/Pusher/PusherNotification";
import DangerousHtml from "Components/DangerousHtml";
import { CustomCampaignTopCard } from "Components/Pusher/CustomCampaignTopCard";
import { CustomCampaignCTAButtons } from "../../index";
import { CustomCampaignValuableList } from ".";

type TTranslations = {
  terms_and_conditions_label: string;
  terms_and_conditions_link_label: string;
  opt_out: string;
};

type Props = {
  pusherData: PusherPaylod;
  pusherModalState: TYPE_PUSHER_MODAL_STATE;
  setPusherModalState: (state: TYPE_PUSHER_MODAL_STATE) => void;
};

type ValuablePopupContentProps = {
  valuable: A.ValuableDetails_PlayerValuableFragment;
  translations: Omit<A.PlayerValuablesQuery, "player">;
  closeModal: () => void;
};

// Todo: move these out so that we don't have any christmas campaign
// references, potential refactor into container/component
export const XMAS_CAMPAIGN_SLUG = "xmas-2021";
export const XMAS_CAMPAIGN_TERMS_SLUG = "christmas-campaign-2021";
export const XMAS_CMS_PAGE = "christmas-campaign-2021-data";

const ValuablePopupContent = ({
  valuable,
  translations,
  closeModal,
}: ValuablePopupContentProps) => {
  const [mutateValuable] = useMutation<
    A.UseValuableMutation,
    A.UseValuableMutationVariables
  >(UseValuable);

  const consumeValuable = () => {
    return mutateValuable({
      variables: {
        id: valuable.id,
        source: getPlatform(),
      },
    }).then(closeModal);
  };

  return (
    <ValuableDetailsContainer
      valuableDetails={valuable}
      onConsumeValuable={consumeValuable as any}
    >
      <div className="c-valuable-details__valuable-card o-position--relative">
        <ValuableCard
          translations={translations}
          {...valuable}
          valuableBadgeName={valuable?.rule?.name}
          caveat={null}
          className="t-elevation--10"
        />
      </div>
    </ValuableDetailsContainer>
  );
};

export const CustomCampaign = ({
  pusherData,
  pusherModalState,
  setPusherModalState,
}: Props) => {
  const {
    loading,
    valuables,
    translations,
  } = usePlayerValuableList(/* TODO: { badgeRuleName: XMAS_CAMPAIGN_SLUG } */);
  const t = useTranslations<TTranslations>(XMAS_CMS_PAGE);

  const [
    selectedValuable,
    selectValuable,
  ] = useState<A.ValuableDetails_PlayerValuableFragment>(null);

  const showValuable = (valuable: A.ValuableDetails_PlayerValuableFragment) => {
    selectValuable(valuable);
    setPusherModalState(PUSHER_MODAL_STATE.SECOND_LAYER_VISIBLE);
  };

  const closeModal = () => setPusherModalState(PUSHER_MODAL_STATE.HIDDEN);
  const disableModal = () => {
    closeModal();
    setCookie(DISABLE_MODAL_COOKIE_KEY, 1, 7);
  };

  if (!pusherData || !t) {
    return null;
  }

  if (
    !loading &&
    pusherModalState === PUSHER_MODAL_STATE.SECOND_LAYER_VISIBLE
  ) {
    return (
      <ValuablePopupContent
        valuable={selectedValuable}
        translations={translations}
        closeModal={closeModal}
      />
    );
  }

  return (
    <div>
      <CustomCampaignTopCard
        title={pusherData.Title}
        description={pusherData.Message}
        backgroundUrl={`top_card_${pusherData.Data.top_image_colour}`}
      />

      <div className="u-padding-x--md">
        <Flex
          direction="vertical"
          align="left"
          className="u-margin-bottom--lg u-margin-top--xlg"
        >
          <CustomCampaignValuableList
            pusherData={pusherData}
            valuables={valuables}
            showValuable={showValuable}
            closeModal={closeModal}
          />

          <Flex.Item className="t-border-bottom border-grey-5 cursor-pointer">
            <GameRowCustomHeader
              header="titles.game-of-the-day"
              gameSlug={pusherData?.Data?.game}
            />
          </Flex.Item>
        </Flex>

        <CustomCampaignCTAButtons
          Button1Link={pusherData.CTAButton2Link}
          Button1Text={pusherData.CTAButtonText}
          Button2Text={pusherData.CTAButton2Text}
          onCTAClick={closeModal}
        />

        <Text tag="p" size="sm" className="u-padding--md text-grey-50">
          <span>
            <DangerousHtml html={t.terms_and_conditions_label} /> &nbsp;
          </span>
          <a
            className="u-font-weight-bold text-grey-50 u-text-decoration-underline"
            rel="noopener noreferrer"
            target="_blank"
            href={`${window.location.origin}/terms/campaign/${XMAS_CAMPAIGN_TERMS_SLUG}`}
          >
            {t.terms_and_conditions_link_label}
          </a>
        </Text>

        <div className="u-display--flex o-flex-align--center u-padding--md o-inset-bottom--none u-width--full u-font-sm u-padding-top">
          <div className="u-font-sm text-grey-50">
            <span className="u-cursor--pointer" onClick={disableModal}>
              {t.opt_out || "Don’t show me this message again this week."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
