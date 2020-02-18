import React from "react";
import PropTypes from "prop-types";

export default class ChatHeader extends React.Component {
  render() {
    const { onClickButton } = this.props;

    return (
      <div className="header">
        <span className="title">Chat Lobby</span>
        <span className="close-button" onClick={() => onClickButton()}>
          &times;
        </span>
      </div>
    );
  }
}

ChatHeader.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};
