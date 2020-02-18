import React from "react";
import PropTypes from "prop-types";

import Messages from "./Messages";
import "./style.less";

export default class ChatLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  handleChange = (e) => {
    const el = e.currentTarget;
    this.setState({ [el.name]: el.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const text = this.state.comment.trim();
    if (text !== "") {
      const { stage, player } = this.props;
      stage.append("chat", {
        text,
        playerId: player._id,
      });
      this.setState({ comment: "" });
    }
  }

  render() {
    const { comment } = this.state;
    const { messages, player } = this.props;

    return (
      <div className="chat">
        <Messages messages={messages} player={player} />
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
      </div>
    );
  }
}

ChatLog.propTypes = {
  messages: PropTypes.array.isRequired,
  stage: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
};
