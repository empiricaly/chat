import React from "react";
import PropTypes from "prop-types";

import "./style.less";

export default class Author extends React.Component {
  render() {
    const { player, self } = this.props;
    const name = player.id.length > 10 ? player.id.slice(0, 10) : player.id;
    return (
      <div className="author">
        <img src={player.get("avatar")} />
        <span className="name">{self ? "You" : name}</span>
      </div>
    );
  }
}

Author.propTypes = {
  player: PropTypes.object.isRequired,
  self: PropTypes.bool,
};
