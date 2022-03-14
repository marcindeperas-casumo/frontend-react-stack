import * as React from "react";
import { FetchResult } from "@apollo/client";
import Flex from "@casumo/cmp-flex";
import { CloseIcon } from "@casumo/cmp-icons";
import * as A from "Types/apollo";
import { ModalContentComponent } from "Components/RSModal";
import { ValuableDetailsContainer } from "Components/ValuableDetails";
import { ValuableDetailsTranslations as Translations } from "Models/valuables";
import "./ValuableDetails.scss";

type TValuableDetailsProps = {
  valuableItem: React.ReactChild;
  valuableDetails: A.ValuableDetails_PlayerValuableFragment;
  onConsumeValuable: (
    id: string
  ) => Promise<FetchResult<A.UseValuableMutation>>;
  onCloseModal?: () => void;
  translations: Translations;
};

type TProps = ModalContentComponent<{}, TValuableDetailsProps>;

const CloseButton = ({ closeAction }) => {
  return (
    <Flex
      align="center"
      justify="center"
      onClick={closeAction}
      className="bg-grey-0 t-border-r--circle u-padding t-color-black cursor-pointer"
    >
      <CloseIcon />
    </Flex>
  );
};
export const ValuableDetailsModal = (props: TProps) => {
  const valuableProps = props.additionalProps;

  const handleConsumeValuable = valuable => {
    closeModal();
    return valuableProps?.onConsumeValuable(valuable);
  };

  if (!valuableProps?.valuableDetails) {
    return null;
  }

  const closeModal = () => {
    valuableProps?.onCloseModal();
    props.closeModal();
  };

  // todo: refactor to use cudlModal
  return (
    <>
      <Flex className="u-overflow-y--auto">
        <ValuableDetailsContainer
          {...props.additionalProps}
          onConsumeValuable={handleConsumeValuable}
        >
          {props.additionalProps?.valuableItem}
        </ValuableDetailsContainer>
        <div className="o-position--absolute c-valuable-details__close-button t-background-grey-light-2 t-border-r--circle u-margin">
          <CloseButton closeAction={closeModal} />
        </div>
      </Flex>
    </>
  );
};
