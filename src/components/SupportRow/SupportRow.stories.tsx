import { storiesOf } from "@storybook/react";
import Text from "@casumo/cmp-text";
import { ChevronRightIcon } from "@casumo/cmp-icons";
import React from "react";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";
import type { SupportRowProps } from "./SupportRow";
import ChatIcon from "./chat-icon.svg";
import EmailIcon from "./email-icon.svg";
import FaqIcon from "./faq-icon.svg";
import { SupportRow } from "./SupportRow";

const stories = storiesOf("SupportRow", module);

stories.add("Default", () => {
  const props: SupportRowProps = {
    cards: [
      {
        Icon: () => <ChatIcon className="u-margin-y" />,
        linkHref: "chat",
        Header: () => (
          <Text tag="h3" className="text-grey-90 u-font-weight-bold">
            Live Chat
          </Text>
        ),
        Description: () => (
          <Text size="sm" className="text-grey-50 u-margin-y">
            Get live personal help with one of our ambassadors available 24/7!
          </Text>
        ),
        LinkElement: () => (
          <Text
            tag="h3"
            className="text-purple-60 u-font-weight-bold u-margin-y--2xlg"
          >
            Start Chat
            <ChevronRightIcon className="u-margin-bottom--sm u-margin-left--sm" />
          </Text>
        ),
      },
      {
        Icon: () => <EmailIcon className="u-margin-y" />,
        linkHref: "email",
        Header: () => (
          <Text tag="h3" className="text-grey-90 u-font-weight-bold">
            Email
          </Text>
        ),
        Description: () => (
          <Text size="sm" className="text-grey-50 u-margin-y">
            If you have any specific inquires you'd like to email us, feel free
            to reach out!
          </Text>
        ),
        LinkElement: () => (
          <Text
            tag="h3"
            className="text-purple-60 u-font-weight-bold u-margin-y--2xlg"
          >
            Send Email
            <ChevronRightIcon className="u-margin-bottom--sm u-margin-left--sm" />
          </Text>
        ),
      },
      {
        Icon: () => <FaqIcon className="u-margin-y" />,
        linkHref: "faq",
        Header: () => (
          <Text tag="h3" className="text-grey-90 u-font-weight-bold">
            FAQs,
          </Text>
        ),
        Description: () => (
          <Text size="sm" className="text-grey-50 u-margin-y">
            Have a question? We may have the answer to it in our question bank!
          </Text>
        ),
        LinkElement: () => (
          <Text
            tag="h3"
            className="text-purple-60 u-font-weight-bold u-margin-y--2xlg"
          >
            Go to FAQs
            <ChevronRightIcon className="u-margin-bottom--sm u-margin-left--sm" />
          </Text>
        ),
      },
    ],
  };

  const loadingProps = { ...props, cards: [...props.cards] };

  loadingProps.cards = loadingProps.cards.map(card => ({
    ...card,
    Header: () => <ParagraphSkeleton size="default" lines={1} />,
    Description: () => <ParagraphSkeleton size="default" lines={2} />,
    LinkElement: () => <ParagraphSkeleton size="default" lines={1} />,
  }));

  return (
    <div className="bg-grey-20 u-padding--lg">
      <h2>Loading state:</h2>
      <SupportRow cards={loadingProps.cards} />

      <h2>Loaded:</h2>
      <SupportRow cards={props.cards} />
    </div>
  );
});
