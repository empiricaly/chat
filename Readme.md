# Empirica Chat

This package contains a React component for a Chat in Lobby and Chat in Round for Empirica.

## Usage Chat in Lobby

For Chat in Lobby, you can create custom lobby component and put the `ChatLobby` component on that component.

```js
import { ChatLobby } from "@empirica/chat";

//...

<ChatLobby gameLobby={gameLobby} player={player}/>;

```

or, you can simply add the `ChatLobby` component like this on `client/main.js` file.

```js
import { ChatLobby } from "@empirica/chat";

//...

Empirica.lobby(ChatLobby)

```

`ChatLobby` expects 2 props:

- gameLobby: a props from Empirica
- player: a props from Empirica

## Usage Chat in Round

```js
import { ChatRound } from "@empirica/chat";

//...

<ChatRound stage={stage} game={game} player={player}/>;

```

`ChatRound` expects 3 props:

- game: a props from Empirica
- stage: a props from Empirica
- player: a props from Empirica