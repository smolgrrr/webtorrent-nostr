import { useRef, useState } from "react";
import videojs, { VideoJsPlayer } from "video.js";
import { VideoJS } from "./components/VideoJS";
import WebTorrent from "webtorrent";
import { testId } from "./constants/webtorrentId";

function App() {
  const [torrentId, setTorrentId] = useState(testId);
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
      <textarea
        name="torrentId"
        id="torrentId"
        cols={50}
        rows={10}
        placeholder="Enter the webtorrent magnet url"
        value={torrentId}
        onChange={(e) => {
          setTorrentId(e.target.value);
        }}
      />
      <div>
        <button
          style={{ width: "100px", height: "50px" }}
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
          Get video
        </button>
      </div>
    </>
  );
}

export default App;
