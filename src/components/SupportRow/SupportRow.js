// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { Link } from "@reach/router";
import { isMobile } from "Components/ResponsiveLayout";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";
import ChatIcon from "./chat-icon.svg";
import Email from "./email-icon.svg";
import Faq from "./faq-icon.svg";
import Arrow from "./arrow.svg";
import "./arrow.scss";

type Props = {
  loading: boolean,
  translations: any,
};

const SupportRow = ({ translations, loading }: Props) => (
  <Flex direction={isMobile() ? "vertical" : "horizontal"} justify="center">
    <Flex.Item
      className="u-text-align-center TODO-PANEL"
      style={{ maxWidth: "310px" }}
    >
      <ChatIcon className="u-margin-y" />

      {!loading ? (
        <>
          <Text tag="h3" className="t-color-grey-90 u-font-weight-bold">
            {translations.liveChat || "Live Chat"}
          </Text>
          <Text size="sm" className="t-color-grey-50 u-margin-y">
            {translations.t2 ||
              "Get live personal help with one of our ambassadors available 24/7!"}
          </Text>

          <Link to="/chat">
            <Text
              tag="h3"
              className="t-color-purple-60 u-font-weight-bold u-margin-y--2xlg"
            >
              {translations.startChat || "Start Chat"}
              <Arrow className="arrow-img" />
            </Text>
          </Link>
        </>
      ) : (
        <ParagraphSkeleton size="default" lines={3} />
      )}
    </Flex.Item>

    <Flex.Item
      className="u-text-align-center TODO-PANEL"
      style={{ maxWidth: "310px" }}
    >
      <Email className="u-margin-y" />

      {!loading ? (
        <>
          <Text tag="h3" className="t-color-grey-90 u-font-weight-bold">
            {translations.email || "Email"}
          </Text>
          <Text size="sm" className="t-color-grey-50 u-margin-y">
            {translations.emailDesc ||
              "If you have any specific inquires you'd like to email us, feel free to reach out!"}
          </Text>

          <Link to="/chat">
            <Text
              tag="h3"
              className="t-color-purple-60 u-font-weight-bold u-margin-y--2xlg"
            >
              {translations.sendEmail || "Send Email"}
              <Arrow className="arrow-img" />
            </Text>
          </Link>
        </>
      ) : (
        <ParagraphSkeleton size="default" lines={3} />
      )}
    </Flex.Item>

    <Flex.Item
      className="u-text-align-center TODO-PANEL"
      style={{ maxWidth: "310px" }}
    >
      <Faq className="u-margin-y" />

      {!loading ? (
        <>
          <Text tag="h3" className="t-color-grey-90 u-font-weight-bold">
            {translations.livechat || "Live Chat"}
          </Text>
          <Text size="sm" className="t-color-grey-50 u-margin-y">
            {translations.liveChatDesc ||
              "Get live personal help with one of our ambassadors available 24/7!"}
          </Text>

          <Link to="/chat">
            <Text
              tag="h3"
              className="t-color-purple-60 u-font-weight-bold u-margin-y--2xlg"
            >
              {translations.gotofaq || "Go to FAQs"}
              <Arrow className="arrow-img" />
            </Text>
          </Link>
        </>
      ) : (
        <ParagraphSkeleton size="default" lines={3} />
      )}
    </Flex.Item>
  </Flex>
);

export default SupportRow;
