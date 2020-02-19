import React from "react";
import PropTypes from "prop-types";

import "./style.less";

export default class Author extends React.Component {
  render() {
    const { player, self } = this.props;
    let name = player && player.id ? player.id : player;
    name = name.length > 10 ? name.slice(0, 10) : name;
    return (
      <div className="author">
        {player.get && player.get("avatar") && <img src={player.get("avatar")} />}

        <span className="name">{self ? "You" : name}</span>
      </div>
    );
  }
}

Author.propTypes = {
  player: PropTypes.object.isRequired,
  self: PropTypes.bool,
};
