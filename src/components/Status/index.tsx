import { StatusInterface } from "../../types/progress";

export const Status = ({
  statusCode,
  status,
}: {
  statusCode: string;
  status: StatusInterface | null;
}) => {
  return (
    <>
      {statusCode === "ready" ? (
        <div>{"ready"}</div>
      ) : statusCode === "wait" ? (
        <div>{"find torrent..."}</div>
      ) : (
        <div>
          <div>Now you can play the video.</div>
          <div>{`total: ${status?.total}`}</div>
          <div>{`downloaded: ${status?.downloaded}`}</div>
          <div>{`download: ↓ ${status?.downloadSpeed}`}</div>
          <div>{`upload: ↑ ${status?.uploadSpeed}`}</div>
          <div>{`progress: ${status?.progress}%`}</div>
        </div>
      )}
    </>
  );
};
