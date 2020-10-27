import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ModalHeader } from "Components/RSModal";
import { hideModal } from "Models/modal";
import { piqIframeResolve } from "Models/payments/payments.actions";
import { PIQ_IFRAME_REDIRECTION_MESSAGE_TYPE } from "Models/payments";
import { basicForm } from "./utils";

const IFRAME_NAME = "payment-use-piq-iframe";
const IFRAME_TITLE = "payment-use-piq-iframe";
const PIQ_IFRAME_MESSAGE_TYPE = "piqRedirectResponse";

export const PaymentUsePiqIframeModal = ({ config }) => {
  const redirectOutput = config.redirectOutput;

  const dispatch = useDispatch();
  const iframe = useRef();

  const onModalClose = () => {
    dispatch(hideModal());
    dispatch(
      piqIframeResolve({
        status: PIQ_IFRAME_REDIRECTION_MESSAGE_TYPE.MODAL_CLOSED,
      })
    );
  };

  useEffect(() => {
    if (redirectOutput) {
      const { method, url, parameters } = redirectOutput;

      if (method.toUpperCase() === "POST") {
        const form = basicForm(IFRAME_NAME, url, method, parameters);
        form.submit();
      }

      if (method.toUpperCase() === "GET") {
        iframe.current.setAttribute("src", url);
      }
    }
  }, [redirectOutput]);

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
        ref={iframe}
        style={{ width: "100%", height: "100%" }}
        title={IFRAME_TITLE}
        name={IFRAME_NAME}
      />
    </>
  );
};
