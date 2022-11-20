import { useEffect, useRef } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import "video.js/dist/video-js.css";

export const VideoJS = ({
  options,
  onReady,
}: {
  options: VideoJsPlayerOptions;
  onReady: Function;
}) => {
  const videoRef = useRef<null | HTMLDivElement>(null);
  const playerRef = useRef<null | VideoJsPlayer>(null);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.className = "videojs-big-play-centered";
      videoRef.current!.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay!);
    //   player.src(options.sources!);
    }
  }, [options, videoRef, onReady]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef}></div>
    </div>
  );
};
