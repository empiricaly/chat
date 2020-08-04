import PropTypes from "prop-types";
import React from "react";

export default class Message extends React.Component {
  renderTime = (timeStamp) => {
    const hours = new Date(timeStamp).getHours();
    const minutes = new Date(timeStamp).getMinutes();
    const time = `${hours
      .toString()
      .padStart(2, 0)}:${minutes.toString().padStart(2, 0)}`;

    return <div className="timeStamp">{time}</div>;
  };

  renderName = (isSelf, name) => {
    return <div className="name">{isSelf ? "You" : name}</div>;
  };

  render() {
    const { message, player, hideName, hideAvatar } = this.props;
    const { player: msgPlayer, text, timeStamp } = message;
    const isSelf = player._id == msgPlayer._id;

    return (
      <div className="message">
        {!hideAvatar && <img src={msgPlayer.avatar} />}
        <div className="text-container">
          {!hideName && this.renderName(isSelf, msgPlayer.name)}
          <div className="text">{text}</div>
          {this.renderTime(timeStamp)}
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    player: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  }).isRequired,
  self: PropTypes.bool,
  hideAvatar: PropTypes.bool,
  hideName: PropTypes.bool,
};
