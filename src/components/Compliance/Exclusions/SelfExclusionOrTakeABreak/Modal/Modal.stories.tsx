import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { suspendAccountCms } from "Models/playOkay/__mocks__/suspendAccountCms";
import { Modal } from "./Modal";

export default {
  component: Modal,
} as ComponentMeta<typeof Modal>;

export const Default: ComponentStory<typeof Modal> = () => (
  <Modal
    t={suspendAccountCms}
    primaryButton={{
      action: () => null,
    }}
    secondaryButton={{
      action: () => null,
    }}
    closeIcon={{
      action: () => null,
    }}
  />
);
