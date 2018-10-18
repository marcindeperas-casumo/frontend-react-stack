import CuratedCard from "Components/CuratedCard";
import { connect } from "react-redux";
import { gameSelector } from "Reducers/schema/selector";

const getGameData = (state, props) => gameSelector(props.id)(state);

const CuratedCardContainer = connect(getGameData)(CuratedCard);

export default CuratedCardContainer;
