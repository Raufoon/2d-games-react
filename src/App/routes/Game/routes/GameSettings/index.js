import React from 'react';
import {withRouter} from 'react-router-dom';

const GameSettings = (props) => {
  return (
    <div>
      settings
      <button onClick={props.history.goBack}>Go Back</button>
    </div>
  )
}

export default withRouter(GameSettings)
