import { useNostrEvents } from "nostr-react";
import { useParams } from 'react-router-dom';
import Player from "./Player/Player";

function parseContent(content: string) {
  const lines = content.split('\n');
  const data: { [key: string]: string } = {};
  lines.forEach((line) => {
    const [key, value] = line.split(': ');
    data[key.toLowerCase()] = value;
  });
  return {
    title: data.title,
    TMDB_id: data.tmdb_id,
    description: data.description,
    magnetlink: data.location,
  };
}

const Movie = () => {
    const { id } = useParams();


  const { events } = useNostrEvents({
    filter: {
      ids: [id!],
      limit: 1,
    },
  });

  const event = events[0];
  if (!event) {
    return <div>No event found</div>;
  }
  
  const { title, TMDB_id, description, magnetlink } = parseContent(event.content);

  return (
    <> 
        <Player magnetlink={magnetlink} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Link</th>
            <th>Description</th>
            <th>Magnet Link</th>
          </tr>
        </thead>
        <tbody>
            <tr key={event.id}>
              <td><a href={`movie/${event.id}`}>{event.id}</a></td>
              <td>{title}</td>
              <td>{TMDB_id}</td>
              <td>{description}</td>
              <td>{magnetlink}</td>
            </tr>
        </tbody>
      </table>
    </>
  );
};

export default Movie;