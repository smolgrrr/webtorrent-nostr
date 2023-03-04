import { useNostrEvents } from "nostr-react";

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

const Home = () => {
  const { events } = useNostrEvents({
    filter: {
      since: 0,
       kinds: [1],
      '#p': [
        '2028cfc4f5ae2b967a75f4196987cbb30d092fa2a439bb807eda382206d39f36'
        ],  
      '#t': [
        'offer'
        ],  
    },
  });

  return (
    <>
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
          {events.map((event) => {
            const { title, TMDB_id, description, magnetlink } = parseContent(event.content);
            
            return (
            <tr key={event.id}>
              <td><a href={`movie/${event.id}`}>{event.id}</a></td>
              <td>{title}</td>
              <td>{TMDB_id}</td>
              <td>{description}</td>
              <td>{magnetlink}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
};

export default Home;