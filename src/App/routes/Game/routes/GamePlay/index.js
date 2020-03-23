import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import './style.css';

class GamePlay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const url = this.props.match.url;

    return (
      <div className="GamePlay">
        Game is playing...
        <button onClick={this.props.history.goBack}>Exit Game</button>
      </div>
    )
  }
}

export default withRouter(GamePlay);
