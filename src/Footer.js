import PropTypes from "prop-types";
import React from "react";

export default class Footer extends React.Component {
  state = { comment: "" };

  handleSubmit = e => {
    e.preventDefault();

    const text = this.state.comment.trim();
    if (text === "") {
      return;
    }

    const { player, onNewMessage } = this.props;

    const msg = {
      text,
      player: {
        _id: player._id,
        avatar: player.get("avatar"),
        name: player.get("name") || player._id
      }
    };

    onNewMessage(msg);

    this.setState({ comment: "" });
  };

  handleChange = e => {
    const el = e.currentTarget;
    this.setState({ [el.name]: el.value });
  };

  render() {
    const { comment } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="chat-footer">
          <input
            name="comment"
            type="text"
            className="chat-input"
            placeholder="Enter chat message"
            value={comment}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <button type="submit" className="chat-button-send">
            Send
          </button>
        </div>
      </form>
    );
  }
}

Footer.propTypes = {
  player: PropTypes.object.isRequired,
  scope: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired,
  onNewMessage: PropTypes.func
};
