import { useRef, useState } from "react";
import videojs, { VideoJsPlayer } from "video.js";
import { VideoJS } from "../VideoJS";
import WebTorrent from "webtorrent";
import { parseStatus } from "../../utils/parseStatus";
import { Status } from "../Status";
import { StatusInterface } from "../../types/Status";

interface PlayerProps {
  magnetlink: string;
}

function Player({ magnetlink }: PlayerProps) {
  const [torrentId] = useState(magnetlink);
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
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <Status statusCode={statusCode} status={status} />
      <div>
        <button
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
    </div>
  );
}

export default Player;