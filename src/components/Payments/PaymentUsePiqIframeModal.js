import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ModalHeader } from "Components/RSModal";
import { hideModal } from "Models/modal";
import { piqIframeResolve } from "Models/payments/payments.actions";
import { PIQ_IFRAME_REDIRECTION_MESSAGE_TYPE } from "Models/payments";

const MODAL_TITLE = "payment-use-piq-iframe";
const PIQ_IFRAME_MESSAGE_TYPE = "piqRedirectResponse";

export const PaymentUsePiqIframeModal = ({ config }) => {
  const dispatch = useDispatch();

  const onModalClose = () => {
    dispatch(hideModal());
    dispatch(
      piqIframeResolve({
        status: PIQ_IFRAME_REDIRECTION_MESSAGE_TYPE.MODAL_CLOSED,
      })
    );
  };

  useEffect(() => {
    const onIframeMessage = event => {
      const data = event.data;
      if (data.type === PIQ_IFRAME_MESSAGE_TYPE) {
        dispatch(hideModal());
        dispatch(
          piqIframeResolve({
            status: data.status,
            txId: data.txId,
          })
        );
      }
    };

    window.addEventListener("message", onIframeMessage);
    return () => {
      window.removeEventListener("message", onIframeMessage);
    };
  }, [dispatch]);

  return (
    <>
      <ModalHeader showCloseButton closeAction={onModalClose} title=" " />
      <iframe
        style={{ width: "100%", height: "100%" }}
        title={MODAL_TITLE}
        src={config.iframeUrl}
      />
    </>
  );
};
