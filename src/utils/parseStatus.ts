import { StatusInterface } from "../types/Status";
import { Torrent } from "webtorrent";
import { prettyBytes } from "./prettyBytes";

export const parseStatus = (torrent: Torrent): StatusInterface => {
  return {
    total: prettyBytes(torrent.length),
    downloaded: prettyBytes(torrent.downloaded),
    uploadSpeed: prettyBytes(torrent.uploadSpeed) + "/s",
    downloadSpeed: prettyBytes(torrent.downloadSpeed) + "/s",
    progress: String(Math.round(torrent.progress * 100 * 100) / 100),
  };
};
