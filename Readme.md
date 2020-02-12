# Chat Lobby

This package contains a React component for a Chat Lobby.

## Usage

Simply add the `<Chat>` component to your React tree.

```js
import Chat from "@empirica/chat";

//...

<Chat messages={messages} stage={stage} player={player}/>;
```

Chat expects 2 props:

- messages: list of messages from Empirica stage.get("chat")
- stage: a props from Empirica
- player: a props from Empirica