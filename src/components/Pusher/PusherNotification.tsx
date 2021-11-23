import React from "react";
import { CustomCampaign } from "./variants/CustomCampaign";
import { TYPE_PUSHER_MODAL_STATE } from "./PusherModal";

export const CHRISTMAS_CAMPAIGN_2021 = "christmas_campaign_2021";

export type PusherPaylod = {
  CTAButton2Link: string;
  CTAButton2Text: string;
  CTAButtonLink: string;
  CTAButtonText: string;
  Data: {
    Component: string;
    OverrideCommunicationStatus: string;
    "Site Block": string;
    event_name: typeof CHRISTMAS_CAMPAIGN_2021 & string;
    game: string;
    terms_link_text: string;
    terms_link_url: string;
    trigger: string;
    top_image_colour: string;
    cashback_reward_subtitle: string;
    cashback_reward_title: string;
    cashback_subtitle: string;
    cashback_title: string;
    deposit_lock_subtitle: string;
    deposit_lock_title: string;
  };
  Date: string;
  DisplayType: string;
  Event: string;
  Expires: string;
  FooterText: string;
  ImageUrl: string;
  IsRead: boolean;
  Message: string;
  MessageId: number;
  PreviewText: string;
  Title: string;
  subscribed: boolean;
};

type Props = {
  pusherData: PusherPaylod;
  pusherModalState: TYPE_PUSHER_MODAL_STATE;
  setPusherModalState: (state: TYPE_PUSHER_MODAL_STATE) => void;
};

export const PusherNotification = ({
  pusherData,
  pusherModalState,
  setPusherModalState,
}: Props) => {
  if (!pusherData) {
    return null;
  }

  if (pusherData.Data.event_name === CHRISTMAS_CAMPAIGN_2021) {
    return (
      <CustomCampaign
        pusherData={pusherData}
        pusherModalState={pusherModalState}
        setPusherModalState={setPusherModalState}
      />
    );
  }

  return null;
};
