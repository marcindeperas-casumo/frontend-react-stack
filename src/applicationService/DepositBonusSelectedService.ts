import { KO_APP_EVENT_DEPOSIT_BONUS_SELECTED } from "Src/constants";
import bridge from "../DurandalReactBridge";

export const depositBonusSelected = ({ badgeId }: {
    badgeId: string;
}) => (bridge as any).emit(KO_APP_EVENT_DEPOSIT_BONUS_SELECTED, badgeId);
