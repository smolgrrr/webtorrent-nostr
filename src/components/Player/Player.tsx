import { useRef, useState } from "react";
import videojs, { VideoJsPlayer } from "video.js";
import { VideoJS } from "../VideoJS";
import WebTorrent from "webtorrent";
import { testId } from "../../constants/webtorrentId";
import { parseStatus } from "../../utils/parseStatus";
import { Status } from "../Status";
import { StatusInterface } from "../../types/Status";

function Player() {
  const [torrentId, setTorrentId] = useState(testId);
  const [status, setStatus] = useState<StatusInterface | null>(null);
  const [statusCode, setStatusCode] = useState("ready");
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
      <Status statusCode={statusCode} status={status} />
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
            setStatusCode("wait");

            const client = new WebTorrent();

            client.add(torrentId, (torrent) => {
              setStatusCode("process");

              const file = torrent.files.find((file) => {
                return file.name.endsWith(".mp4");
              });

              setInterval(() => setStatus(parseStatus(torrent)), 300);
              file?.renderTo("video", {}, () => {});
              torrent.on("done", () => {
                setStatusCode("ready");
              });
            });
          }}
        >
          Get video
        </button>
      </div>
    </>
  );
}

export default Player;