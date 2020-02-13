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

  handleChange(e) {
    const el = e.currentTarget;
    this.setState({ [el.name]: el.value });
  }

  handleSubmit(e) {
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
      <div className="chat pt-card">
        <Messages messages={messages} player={player} />
        <form onSubmit={e => this.handleSubmit(e)}>
          <div className="pt-control-group">
            <input
              name="comment"
              type="text"
              className="pt-input pt-fill"
              placeholder="Enter chat message"
              value={comment}
              onChange={e => this.handleChange(e)}
              autoComplete="off"
            />
            <button type="submit" className="pt-button pt-intent-primary">
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
