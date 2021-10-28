import React from "react";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import MaskImage from "Components/MaskImage";
import DangerousHtml from "Components/DangerousHtml";

const HeaderImgMask = () => (
  <path d="M378 261.753C238.58 277.769 68.4582 269.761 -1 261.753V0H376.993L378 261.753Z" />
);

export const PusherNotif = props => {
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
        <Flex
          className="o-ratio__content u-margin-bottom--md c-valuable-details__valuable-card-wrapper u-margin-bottom--lg"
          justify="end"
          align="center"
          direction="vertical"
        >
          <div data-test-id="valuable-renderer-wrapper">{}</div>
        </Flex>
      </div>
      <div className="u-padding-x--md">
        <Flex
          direction="vertical"
          align="center"
          className="u-margin-bottom--lg u-margin-top--xlg"
        >
          <Flex.Item>
            <Text className="center">
              <DangerousHtml html={"<h2>Title</h2>"} />
            </Text>
          </Flex.Item>

          <Flex.Item className="u-width--1/3 u-margin-y--md">
            <hr className="c-valuable-details__separator t-border t-border-r--pill border-grey-0" />
          </Flex.Item>

          <Flex.Item>
            <Text tag="strong" className="text-grey-70" size="xs">
              {props.pusherData || "Placeholder message"}
            </Text>
          </Flex.Item>
        </Flex>

        <div className="c-valuable-details__footer u-padding--md o-position--sticky o-inset-bottom--none">
          <ButtonPrimary
            className="u-width--full"
            onClick={() => {}}
            data-test="valuable-action-button"
          >
            Button
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};
