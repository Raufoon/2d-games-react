import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import './style.css';

const fakeImgUrl = 'https://ae01.alicdn.com/kf/HTB1fItvXACWBuNjy0Faq6xUlXXaI/Snake-30X42-CM-nostalgia-vintage-kraft-paper-poster-no-frame-painting-tattoo-shop-wall-decoration.jpg_q50.jpg';
const fakeData = {
  id: 1,
  title: "Snake Game",
  posterUrl: fakeImgUrl
};

class GameMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...fakeData,
    }
  }

  render() {
    const {title, posterUrl} = this.state;
    const {url} = this.props.match;

    return (
      <div className="GameMenu">
        <img className="poster" src={posterUrl}></img>
        <ul className="options">
          <li><Link to={`${url}/play`}>Start Game</Link></li>
          <li><Link to={`${url}/settings`}>Settings</Link></li>
          <li><Link to="/">Home</Link></li>
        </ul>
      </div>
    )
  }
}

export default withRouter(GameMenu);
