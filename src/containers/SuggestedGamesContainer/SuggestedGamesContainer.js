import React from "react";
import ReactDOM from "react-dom";
import ListContainer from "../../components/ListContainer";
import SkeletonGameTiles from "../../components/SkeletonGameTiles";
import GameBrowserService from "../../features/api-concept-2/application-service/GameBrowserService";
import { getHostElement, trace } from "../../utils";

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

    console.log({ GameBrowserService });

    GameBrowserService.allTopLists()
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

  render() {
    const { data, loading } = this.state;

    return ReactDOM.createPortal(
      <React.Fragment>
        {loading ? (
          <div className="u-padding-bottom--semi@mobile">
            {Array.from(Array(4).keys()).map(i => (
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
