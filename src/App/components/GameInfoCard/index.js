import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

const GameInfoCard = (props) => {
  const {className, id, title, posterUrl} = props;
  return (
    <Link to={`/game/${id}`} className={`GameInfoCard ${className}`}>
      <img src={posterUrl}/>
      <label>{title}</label>
    </Link>
  )
}

export default GameInfoCard;
