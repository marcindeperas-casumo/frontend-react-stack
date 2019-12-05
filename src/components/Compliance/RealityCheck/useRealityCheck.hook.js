// @flow
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { isEmpty } from "ramda";
import {
  realityCheckSelector,
  REALITY_CHECK_MODAL,
} from "Models/playOkay/realityCheck";
import { showModal } from "Models/modal";

export function useRealityCheck() {
  const dispatch = useDispatch();
  const realityCheck = useSelector(realityCheckSelector, shallowEqual);

  if (!isEmpty(realityCheck)) {
    dispatch(showModal(REALITY_CHECK_MODAL));
  }
}
