import React from "react";
import ReactDOM from "react-dom";
import SuggestedGames from "../../components/SuggestedGames";
import { suggestedGames } from "../../api";

export default class SuggestedGamesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.otherComponentRoot = document.getElementById("otherComponent");
    this.el = document.createElement("div");
    this.state = {
      loading: false,
      games: []
    };
  }

  componentWillMount() {
    this.otherComponentRoot.appendChild(this.el);
    this.setState({ ...this.state, loading: true });

    suggestedGames()
      .then(data => {
        this.setState({
          ...this.state,
          loading: false,
          games: data
        });
      })
      .catch(console.error);
  }

  componentWillUnmount() {
    this.otherComponentRoot.removeChild(this.el);
  }

  renderLoading() {
    return <div style={{
      height: '246px',
      backgroundColor: 'lightgrey'
    }}>Loading suggested games</div>;
  }

  renderLoaded() {
    const { games } = this.state;
    return <SuggestedGames games={games} />;
  }

  render() {
    const { loading } = this.state;
    return ReactDOM.createPortal(
      loading ? this.renderLoading() : this.renderLoaded(),
      this.el
    );
  }
}
