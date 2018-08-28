import React from "react";
import JackpotTicker from "../components/JackpotTicker";
import JackpotsService from "../applicationService/JackpotsService";

export default class JackpotTickerContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      jackpot: null,
    };
  }

  componentDidMount() {
    const { gameId } = this.props;
    // console.log(gameId);
    if (gameId) {
      JackpotsService.getJackpotById(gameId).then(jackpot => {
        // console.log(
        //   JackpotsService.getJackpotById(gameId),
        //   JackpotsService.jackpots()
        // );
        this.setState({ jackpot });
      });
    }
  }

  render() {
    const { jackpot } = this.state;

    if (jackpot) {
      return <JackpotTicker jackpotAmount={jackpot.amount} />;
    }

    return null;
  }
}
