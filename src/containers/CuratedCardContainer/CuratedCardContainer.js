import CuratedCard from "Components/CuratedCard";
import { connect } from "react-redux";
import { curatedSelector } from "Reducers/schema/selector";

const curatedData = (state, props) => curatedSelector(props.slug)(state);

const CuratedCardContainer = connect(curatedData)(CuratedCard);

export default CuratedCardContainer;
