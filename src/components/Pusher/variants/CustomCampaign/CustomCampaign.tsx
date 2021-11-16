import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as A from "Types/apollo";
import MaskImage from "Components/MaskImage";
import { ValuableCard } from "Components/ValuableCard";
import { GameRowCustomHeader } from "Components/GameRow";
import { ValuableDetailsContainer } from "Components/ValuableDetails";
import { usePlayerValuableList } from "Components/PlayerValuableList/usePlayerValuableList";
import { getPlatform, interpolateWithJSX } from "Utils/utils";
import { UseValuable } from "Components/PlayerValuableList/PlayerValuables.graphql";
import { ROUTE_IDS } from "Src/constants";
import {
  DISABLE_MODAL_COOKIE_KEY,
  PUSHER_MODAL_STATE,
  TYPE_PUSHER_MODAL_STATE,
} from "Components/Pusher/PusherModal";
import { PlayerValuableListVertical } from "Components/PlayerValuableList";
import { PusherPaylod } from "Components/Pusher/PusherNotification";
import Cashback from "Components/ValuableThumbnail/Icons/cashback.svg";
import { setCookie } from "Utils/setCookie";
import { useTranslations } from "Utils/hooks";
import { CustomCampaignCTAButtons } from "../../index";

const HeaderImgMask = () => (
  <path d="M378 261.753C238.58 277.769 68.4582 269.761 -1 261.753V0H376.993L378 261.753Z" />
);

type TTranslations = {
  terms_and_conditions_label: string;
  terms_and_conditions_link_label: string;
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
export const CMS_KEY_PREFIX = "christmas-campaign-2021-data";

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
  const { loading, valuables, translations } = usePlayerValuableList();
  const t = useTranslations<TTranslations>(CMS_KEY_PREFIX);

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
      <div className="o-ratio c-valuable-details t-border-r--md">
        <div className="o-ratio__content c-valuable-details__header">
          <MaskImage
            id={`123`}
            imageUrl={
              "https://images.casumo.com/2019/04/background-deposit.png?w=250&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=1"
            }
            width={375}
            height={334}
          >
            <HeaderImgMask />
          </MaskImage>
        </div>
      </div>
      <div className="u-padding-x--md">
        <Flex
          direction="vertical"
          align="left"
          className="u-margin-bottom--lg u-margin-top--xlg"
        >
          {valuables.slice(0, 10).map(val => (
            <Flex.Item key={val.id}>
              <Flex
                style={{ width: "160px" }}
                className={"text-yellow-30 u-cursor--pointer u-padding-x--md"}
                onClick={() => showValuable(val)}
                align="center"
              >
                <Flex.Item style={{ width: "160px" }}>
                  <Cashback className="u-width--full" />
                </Flex.Item>
                <Flex.Item>Valuable</Flex.Item>
              </Flex>
            </Flex.Item>
          ))}

          <Flex.Item className="u-margin-y--md">
            <hr className="c-valuable-details__separator t-border t-border-r--pill border-grey-0" />
          </Flex.Item>

          <Flex.Item>
            <PlayerValuableListVertical
              badgeRuleName={XMAS_CAMPAIGN_SLUG}
              hideTitles
            />
          </Flex.Item>

          <Flex.Item>
            <GameRowCustomHeader
              header="titles.game-of-the-day"
              gameSlug={pusherData?.Data?.game}
            />
          </Flex.Item>

          <Flex.Item className="u-margin-top--lg">
            <Text tag="p" className="u-padding--md text-grey-50">
              {interpolateWithJSX(
                {
                  link: (
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`${window.location.origin}/terms/campaign/${XMAS_CAMPAIGN_TERMS_SLUG}`}
                    >
                      {t.terms_and_conditions_link_label}
                    </a>
                  ),
                },
                t.terms_and_conditions_label
              )}
            </Text>
          </Flex.Item>
        </Flex>
        <CustomCampaignCTAButtons
          Button1Link={ROUTE_IDS.CASH_DEPOSIT}
          Button1Text={pusherData.CTAButtonText || "Learn more"}
          Button2Link={ROUTE_IDS.CASH_DEPOSIT}
          Button2Text={pusherData.CTAButton2Text || "Deposit"}
          onCTAClick={closeModal}
        />

        <div className="u-display--flex o-flex-align--center u-padding--md o-inset-bottom--none u-width--full u-font-sm u-padding-x--sm u-padding-top">
          <div className="u-font-sm text-grey-70">
            <span className="u-cursor--pointer" onClick={disableModal}>
              Don’t show me this message again this week.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
