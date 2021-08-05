import { TMandatoryMessage } from "Models/mandatoryMessages";

export type Props = {
  topTitle: string;
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
  icon: string;
};

export type ContainerProps = {
  t: {
    headline: string;
    call_to_action_button_text: string;
    icon: string;
  };
  config: {
    input: {
      slug: string;
      message: TMandatoryMessage;
    };
  };
};
