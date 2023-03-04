import { NostrProvider } from "nostr-react";
import Player from "./components/Player/Player";

import PostButton from "./components/Nostr";
import ProfileFeed from "./components/getEvents";

const relayUrls = [
  "wss://relay.snort.social",
  "wss://nos.lol",
  "wss://relay.damus.io",
];

function App() {
  return (
    <>
    <NostrProvider relayUrls={relayUrls} debug={true}>
      <div>
        <Player />
        <PostButton />
        <ProfileFeed />
      </div>
      </NostrProvider>
    </>
  );
}

export default App;
