import React from 'react';
import logo from './logo.svg';
import './style.css';

const AppLogo = (props) => {
  const {size} = props;
  return (
    <img className="AppLogo"
      src={logo}
      alt={'A logo of the app saying "2D Games Online"'}
      style={{height: `${size || '5vmin'}`}}/>
  )
}

export default AppLogo;
