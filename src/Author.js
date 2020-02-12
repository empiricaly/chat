import React from "react";
import PropTypes from "prop-types";

import './style.less'

export default class Author extends React.Component {
  render() {
    const { player, self } = this.props;

    return (
      <div className="author">
        <img src={player.get("avatar")} />
        <span className="name" style={{ color: player.get("nameColor") }}>
          {self ? "You" : player.get("name")}
        </span>
      </div>
    );
  }
}

Author.propTypes = {
  player: PropTypes.object.isRequired,
  self: PropTypes.bool,
};
