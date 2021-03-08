import Flex from "@casumo/cmp-flex";
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

type Props = {
  config: any;
};

export const PaymentUsePiqIframeModal = ({ config }: Props) => {
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

      if (method.toUpperCase() === "GET" && iframe.current) {
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        iframe.current.setAttribute("src", url);
      }
    }
  }, [redirectOutput]);

  useEffect(() => {
    const onIframeMessage = ({ data }) => {
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
    <Flex direction="vertical" justify="space-between">
      <Flex.Item>
        <ModalHeader showCloseButton closeAction={onModalClose} title=" " />
      </Flex.Item>
      <Flex.Item className="c-piq-modal-content">
        <iframe
          className="c-fullspace-iframe"
          ref={iframe}
          title={IFRAME_TITLE}
          name={IFRAME_NAME}
        />
      </Flex.Item>
    </Flex>
  );
};
