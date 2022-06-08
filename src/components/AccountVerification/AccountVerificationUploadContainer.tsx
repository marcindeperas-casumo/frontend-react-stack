import * as React from "react";
import { useSelector } from "react-redux";
import { Issue, ItemSkeleton } from "@casumo/frontend-kyc-react";
import { mapItemToDefiningString } from "@casumo/frontend-kyc/dist/mappers/verification-item.mappers";
import { content as itemContent } from "@casumo/frontend-kyc/dist/content/kyc.item.mocks";
import { content as fallbackContent } from "@casumo/frontend-kyc/dist/content/kyc.item.fallback.mocks";
import { getTypeContent } from "@casumo/frontend-kyc/dist/mappers/content.mappers";
import { TEvent } from "@casumo/frontend-kyc/dist/api/events.types";
import { useGetRedirectionURLMutation } from "Models/kyc";
import { playerIdSelector } from "Models/handshake";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { useGetVerificationItem } from "Models/kyc/hooks";
import { ROUTE_IDS } from "Src/constants";
import { AccountVerificationUpload } from "./AccountVerificationUpload";
import { AccountVerificationRootContainer } from "./AccountVerificationRootContainer";

type TMessage = { data: TEvent };

const iFrameMessageHandler = ({
  message,
  onSuccess,
  onError,
}: {
  message: TMessage;
  onSuccess: () => void;
  onError: () => void;
}) => {
  if (message?.data?.type === "kycIFrameMessage") {
    const { payload } = message.data;

    if (payload.status === "success") {
      onSuccess();
    } else {
      onError();
    }
  }
};

export function AccountVerificationUploadContainer() {
  const item = useGetVerificationItem();
  const { navigate } = useCrossCodebaseNavigation();

  const typeContent =
    (item && getTypeContent(item, itemContent.children)) || fallbackContent;

  const playerId = useSelector(playerIdSelector) as string;
  const [getRedirectionURL, { data, isError }] = useGetRedirectionURLMutation();
  const { origin } = window.location;

  const type = item && item.type;
  const paymentMethodId = item && item.paymentMethodId;
  const active = item && mapItemToDefiningString(item);

  const content = {
    header: typeContent.fields.header,
  };

  const handler = (message: TMessage) =>
    iFrameMessageHandler({
      message,
      onSuccess: () => navigate(ROUTE_IDS.ACCOUNT_VERIFICATION),
      onError: () => navigate(ROUTE_IDS.ACCOUNT_VERIFICATION_ISSUE),
    });

  React.useEffect(() => {
    window.addEventListener("message", handler, true);

    return () => {
      window.removeEventListener("message", handler, true);
    };
  });

  React.useEffect(() => {
    if (type) {
      getRedirectionURL({
        playerId,
        verificationItemKey: {
          type,
          paymentMethodId,
        },
        successUrl: `${origin}/jumioStatuses/success.html`,
        errorUrl: `${origin}/jumioStatuses/error.html`,
      });
    }
  }, [type, paymentMethodId, playerId, origin, getRedirectionURL]);

  if (isError) {
    // todo: replace the messages with proper ones!

    return (
      <AccountVerificationRootContainer options={{ active }}>
        <div className="p-lg mt">
          <Issue
            title="We're sorry"
            text="It seems that we could not connect to our document handling service. Please contact us by chat if this message will repeat itself."
          />
        </div>
      </AccountVerificationRootContainer>
    );
  }

  if (!item || !data) {
    return (
      <AccountVerificationRootContainer options={{ active }}>
        <div className="tablet:p-md">
          <ItemSkeleton />
        </div>
      </AccountVerificationRootContainer>
    );
  }

  if (data.limitReached) {
    // todo: replace the messages with proper ones!

    return (
      <AccountVerificationRootContainer options={{ active }}>
        <div className="p-lg mt">
          <Issue
            title="Uh oh"
            text="You have reached a limit of uploads for this document. Give us some time to review them, or contact our support through chat."
          />
        </div>
      </AccountVerificationRootContainer>
    );
  }

  return (
    <AccountVerificationRootContainer options={{ active }}>
      <AccountVerificationUpload
        id={`jumio-for-${item.type}`}
        redirectioUrl={data?.redirectionUrl}
        content={content}
        onHeaderAction={() => navigate(ROUTE_IDS.ACCOUNT_VERIFICATION)}
      />
    </AccountVerificationRootContainer>
  );
}
