import React from "react";
import PropTypes from "prop-types";

export default class ChatClosedButton extends React.Component {
  render() {
    const { onClickButton } = this.props;

    return (
      <div className="empirica-chat-close" onClick={() => onClickButton()}>
        <span className="close-text">Chat Lobby</span>
      </div>
    );
  }
}

ChatClosedButton.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};
