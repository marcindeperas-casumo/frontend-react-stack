import * as React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { suspendAccountCms } from "Models/playOkay/__mocks__/suspendAccountCms";
import { takeABreakPeriods } from "Models/playOkay/exclusions/__mocks__/validPeriods";
import { Modal } from "./Modal";
import { ModalStep1 } from "./ModalStep1";
import { steps } from "./Modal.constants";
import { ModalStep2 } from "./ModalStep2";

export default {
  component: Modal,
} as ComponentMeta<typeof Modal>;

const closeIcon = {
  action: () => null,
};

export const Step1: ComponentStory<typeof Modal> = () => (
  <Modal
    t={suspendAccountCms}
    progressSteps={steps}
    primaryButton={{
      action: () => null,
    }}
    secondaryButton={{
      action: () => null,
    }}
    closeIcon={closeIcon}
  >
    <ModalStep1
      t={suspendAccountCms}
      validPeriods={takeABreakPeriods}
      selectPeriod={() => null}
      selectedPeriod={null}
    />
  </Modal>
);

export const Step2: ComponentStory<typeof Modal> = () => (
  <Modal
    t={suspendAccountCms}
    progressSteps={steps.map(step => ({ ...step, isActive: true }))}
    primaryButton={{
      action: () => null,
    }}
    secondaryButton={{
      action: () => null,
    }}
    closeIcon={closeIcon}
  >
    <ModalStep2
      t={suspendAccountCms}
      validPeriods={takeABreakPeriods}
      selectPeriod={() => null}
      selectedPeriod={7}
    />
  </Modal>
);
