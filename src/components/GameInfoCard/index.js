import React from 'react';
import './style.css';

const GameInfoCard = (props) => {
  const {className, title, posterUrl} = props;
  return (
    <div className={`GameInfoCard ${className}`}>
      <img src={posterUrl}/>
      <label>{title}</label>
    </div>
  )
}

export default GameInfoCard;
