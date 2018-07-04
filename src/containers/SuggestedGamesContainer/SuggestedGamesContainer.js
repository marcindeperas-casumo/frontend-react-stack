import React from "react";
import ReactDOM from "react-dom";
import gameBrowserService from "../../features/top-lists/game-browser";
import ListContainer from "../../components/ListContainer";
import GameBrowserService from "../../features/api-concept-2/application-service/GameBrowserService";
import { trace, getHostElement } from "../../utils";
import SessionService from "../../features/api-concept-2/application-service/SessionService";

export default class SuggestedGamesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.otherComponentRoot = getHostElement("otherComponent");
    this.el = document.createElement("div");
    this.state = {
      loading: false,
      data: []
    };
  }

  componentWillMount() {
    this.otherComponentRoot.appendChild(this.el);
    this.setState({ ...this.state, loading: true });

    window.gameBrowserService = gameBrowserService;
    console.log(gameBrowserService, { GameBrowserService });

    GameBrowserService.allTopLists()
      // gameBrowserService
      //   .allTopLists()
      .then(trace)
      .then(data => {
        this.setState({
          ...this.state,
          loading: false,
          data
        });
      })
      .catch(e => {
        this.setState({
          ...this.state,
          loading: false,
          data: []
        });
        console.error(e);
      });
  }

  componentWillUnmount() {
    this.otherComponentRoot.removeChild(this.el);
  }

  renderLoading() {
    return (
      <div
        style={{
          height: "246px",
          backgroundColor: "lightgrey"
        }}
      >
        Loading suggested games
      </div>
    );
  }

  render() {
    const { data } = this.state;

    return ReactDOM.createPortal(
      <React.Fragment>
        {data.map(x => <ListContainer key={x.title} {...x} />)}
      </React.Fragment>,
      this.el
    );
  }
}
