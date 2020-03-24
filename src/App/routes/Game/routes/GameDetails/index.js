import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import './style.css';

const GameDetails = (props) => {
  const {title, posterUrl} = props;
  const {url} = props.match;

  return (
    <div className="GameDetails">
      <div className="poster" style={{backgroundImage: `url(${posterUrl})`}}/>

      <label className='title'>{title}</label>

      <ul className="options">
        <li><Link className="option" to={`${url}/play`}>Start Game</Link></li>
        <li><Link className="option" to={`${url}/settings`}>Settings</Link></li>
        <li><Link className="option" to="/">Back</Link></li>
      </ul>
    </div>
  )
}

export default withRouter(GameDetails);
