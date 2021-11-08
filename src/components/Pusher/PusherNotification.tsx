import React from "react";
import { CustomLoginCampaign } from "./variants/CustomLoginCampaign";
import { TYPE_PUSHER_MODAL_STATE } from "./PusherModal";

export const CHRISTMANS_CAMPAIGN_2021 = "christmas_campaign_2021";

export type PusherPaylod = {
  CTAButton2Link: string;
  CTAButton2Text: string;
  CTAButtonLink: string;
  CTAButtonText: string;
  Data: {
    Component: string;
    OverrideCommunicationStatus: string;
    "Site Block": string;
    event_name: typeof CHRISTMANS_CAMPAIGN_2021 & string; // more to come
    game: string;
    terms_link_text: string;
    terms_link_url: string;
    trigger: string;
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

  if (pusherData.Data.event_name === CHRISTMANS_CAMPAIGN_2021) {
    return (
      <CustomLoginCampaign
        pusherData={pusherData}
        pusherModalState={pusherModalState}
        setPusherModalState={setPusherModalState}
      />
    );
  }

  return null;
};
