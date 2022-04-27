import { TMandatoryMessage } from "Models/mandatoryMessages";

export type Props = {
  topTitle: string;
  cudlIcon?: string;
  primaryButton: {
    text: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    action: () => void;
  };
  content: string;
  replacements: {
    [key: string]: string;
  };
};

export type TTranslations = {
  headline: string;
  call_to_action_button_text: string;
  cudl_icon: string;
};

export type ContainerProps = {
  t: TTranslations;
  config: {
    input: {
      slug: string;
      message: TMandatoryMessage;
    };
  };
};
