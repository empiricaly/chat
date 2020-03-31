import PropTypes from "prop-types";
import React from "react";

export default class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <span className="title">Chat</span>
        <span className="close-button" onClick={this.props.onClick}>
          &times;
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired
};
