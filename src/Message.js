import PropTypes from "prop-types";
import React from "react";

export default class Message extends React.Component {
  render() {
    const { message, player } = this.props;
    const { player: msgPlayer, text } = message;
    const isSelf = player._id == msgPlayer._id;

    return (
      <div className="message">
        <div className="author">
          {player.avatar ? <img src={player.avatar} /> : null}
          <span className="name">{isSelf ? "You" : player.name}</span>
        </div>
        : {text}
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    player: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string
    })
  }).isRequired,
  self: PropTypes.bool
};
