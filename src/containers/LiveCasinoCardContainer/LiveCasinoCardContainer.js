import LiveCasinoCard from "Components/LiveCasinoCard";
import { connect } from "react-redux";
import { gameSelector } from "Reducers/schema/selector";

const getGameData = (state, props) => gameSelector(props.id)(state);

const LiveCasinoCardContainer = connect(getGameData)(LiveCasinoCard);

export default LiveCasinoCardContainer;
