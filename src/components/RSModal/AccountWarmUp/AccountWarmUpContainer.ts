import * as React from "react";
import { useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import * as A from "Types/apollo";
import { showModal } from "Models/modal";
import { isWarmUpPhaseSelector } from "Models/handshake";
import { useJurisdiction, useTranslations } from "Utils/hooks";
import { REACT_APP_MODAL } from "Src/constants";
import { CMS_SLUG } from "../AccountWarmUp";
import type { TAccountWarmUpPage } from "../AccountWarmUp";
import { AccountWarmUp } from './AccountWarmUp';

type TAccountWarmUpProps = {
  acceptModal?: () => void;
  closeModal?: () => void;
};

export function AccountWarmUpContainer({ acceptModal, closeModal}: TAccountWarmUpProps) {
    const { isDGOJ } = useJurisdiction();
    const isInWarmUpPhase = useSelector(isWarmUpPhaseSelector);
    const content = useTranslations<TAccountWarmUpPage>(CMS_SLUG);

    if (!isDGOJ || !isInWarmUpPhase || !content) {
        return null;
    }

    return (
        <AccountWarmUp></AccountWarmUp>
    );
}
