import React from 'react';
import logo from './logo.svg';
import './style.css';

const AppLogo = (props) => {
  const {size} = props;
  return (
    <img className="AppLogo" src={logo} style={{height: `${size || '5vmin'}`}}/>
  )
}

export default AppLogo;
