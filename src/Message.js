import React from "react";
import PropTypes from "prop-types";

import './style.less'

class Message extends React.Component {
  render() {
    const { text, subject } = this.props.message;
    const { self } = this.props;
    return (
      <div className="message">
        <Author player={subject} self={self} />
        {text}
      </div>
    );
  }
}

Message.propTypes = {
  key: PropTypes.string.isRequired,
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    subject: PropTypes.object.isRequired,
  }).isRequired,
  self: PropTypes.bool,
};
