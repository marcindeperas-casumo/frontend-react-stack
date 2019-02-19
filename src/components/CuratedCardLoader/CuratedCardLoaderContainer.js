// @flow
import { connect } from "react-redux";
import { hasMadeFirstDeposit as hasMadeFirstDepositSelector } from "Models/handshake";
import CuratedCardLoader from "Components/CuratedCardLoader/CuratedCardLoader";

type props = {
  defaultCardSlug: string | Array<string>,
};

// (The "card" prop can be an array right now, because
// in the CMS the page-relationship selector returns an array)
const CuratedCardLoaderContainer = connect((state, { card }) => ({
  hasMadeFirstDeposit: hasMadeFirstDepositSelector(state),
  defaultCardSlug: Array.isArray(card) ? card[0] : card,
}))(CuratedCardLoader);

export default CuratedCardLoaderContainer;
