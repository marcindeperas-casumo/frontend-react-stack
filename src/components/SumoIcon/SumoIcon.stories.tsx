// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { SumoIconContextProvider } from "Components/SumoIcon/SumoIconContext";
import { SumoIcon } from "./SumoIcon";
import { useSumoIcon } from "./useSumoIconHook";

const ToggleWrapper = ({
  children,
  icon,
  color = "white",
  bgColor = "blue-50",
}: {
  children: React.Node,
  icon: any,
  color?: string,
  bgColor?: string,
}) => {
  const { addIcon, hasIcon, removeIcon } = useSumoIcon({
    color,
    bgColor,
  });

  return (
    <div
      onClick={() => {
        if (!hasIcon()) {
          addIcon(icon);
        } else {
          removeIcon();
        }
      }}
    >
      {children}
    </div>
  );
};

const Example = ({
  color = "white",
  bgColor = "blue-50",
}: {
  color?: string,
  bgColor?: string,
}) => (
  <div
    className={`t-background-${bgColor} t-color-${color} t-border-r--circle u-width--3xlg u-height--3xlg o-flex-align--center o-flex-justify--center u-cursor--pointer`}
  >
    {color[0]}
  </div>
);

const story = () => {
  return (
    <MockStore>
      <SumoIconContextProvider>
        <SumoIcon />
        <br />
        <br />
        <br />
        <Flex direction="horizontal">
          <Flex.Item>
            <ToggleWrapper icon={Example}>
              <Example />
            </ToggleWrapper>
          </Flex.Item>
          <Flex.Item>
            <ToggleWrapper icon={Example} color="red-30" bgColor="black">
              <Example color="red-30" bgColor="black" />
            </ToggleWrapper>
          </Flex.Item>
          <Flex.Item>
            <ToggleWrapper icon={Example} color="yellow-30" bgColor="green-50">
              <Example color="yellow-30" bgColor="green-50" />
            </ToggleWrapper>
          </Flex.Item>
        </Flex>
      </SumoIconContextProvider>
    </MockStore>
  );
};

const stories = storiesOf("SumoIcon", module);

stories.add("Default", story);
