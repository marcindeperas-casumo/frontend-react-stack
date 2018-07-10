import React from "react";
import ReactDOM from "react-dom";
import gameBrowserService from "../../features/top-lists/game-browser";
import ListContainer from "../../components/ListContainer";
import SkeletonGameTiles from "../../components/SkeletonGameTiles";
import { trace, getHostElement } from "../../utils";

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

    window.gameBrowserService = gameBrowserService;
    console.log('gameBrowserService', gameBrowserService);

    gameBrowserService
      .allTopLists()
      .then(trace)
      .then(data => {
        this.setState({
          ...this.state,
          loading: false,
          data
        });
      })
      .catch(console.error);
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
  }

  componentWillUnmount() {
    this.otherComponentRoot.removeChild(this.el);
  }

  render() {
    const { data, loading } = this.state;

    return ReactDOM.createPortal(
      <React.Fragment>
        {loading ? (
          <div className="u-padding-bottom--semi@mobile">
            {Array.from(Array(4).keys()).map((i) => (
              <SkeletonGameTiles
                key={i}
                tileWidth={170}
                tileHeight={204}
                preserveAspectRatio="none"
                className="u-padding-top--semi u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
              />
            ))}
          </div>
        ) : (
          data.map(x => <ListContainer key={x.title} {...x} />)
        )}
      </React.Fragment>,
      this.el
    );
  }
}
