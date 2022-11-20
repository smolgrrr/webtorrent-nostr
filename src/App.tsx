import React, { useEffect, useRef, useState } from "react";
import videojs, { VideoJsPlayer } from "video.js";
import { VideoJS } from "./components/VideoJS";
import WebTorrent from "webtorrent";

function App() {
  const [torrentId, setTorrentId] = useState("");
  const playerRef = useRef<null | VideoJsPlayer>(null);

  const videoJsOptions = {
    autoplay: true,
    // controls: true,
    responsive: true,
    fluid: true,
  };

  const handlePlayerReady = (player: VideoJsPlayer) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <input
        type="text"
        name="torrentId"
        id="torrentId"
        placeholder="Enter the magnet url"
        onChange={(e) => {
          setTorrentId(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const client = new WebTorrent();

          client.add(torrentId, (torrent) => {
            const file = torrent.files.find((file) => {
              return file.name.endsWith(".mp4");
            });

            file?.renderTo("video", {}, () => {});
          });
        }}
      >
        get
      </button>
    </>
  );
}

export default App;
